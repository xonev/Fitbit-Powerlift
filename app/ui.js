import * as u from '../common/util';
import {getElement} from 'ui/util';
import {Pages} from 'ui/pages';
import {Transitions} from 'ui/transitions';

export function build(dependencies = {}, initialState = {}) {
  const {app} = dependencies;

  const defaultInitialState = {
    currentPage: Pages.home,
    stateChangeSubscriptions: []
  };

  const state = u.merge(defaultInitialState, initialState);

  const extern = {};

  function load(page) {
    page.activeElements.forEach(elementId => {
      getElement(elementId).style.display = 'inherit';
    });

    if (Transitions['*'][page.id]) {
      Transitions['*'][page.id](app);
    }

    page.stateToPresentations.forEach(stateToPresentation => {
      const {elementId, elementAttribute, transform, statePathId} = stateToPresentation;
      const subscriptionId = app.subscribeToStateChange(statePathId, newState => {
        getElement(elementId)[elementAttribute] = transform(newState);
      });
      state.stateChangeSubscriptions.push(subscriptionId);
    });

    state.currentPage = page;
  }

  function transitionTo(page) {
    state.currentPage.activeElements.forEach(elementId => {
      getElement(elementId).style.display = 'none';
    });

    state.stateChangeSubscriptions.forEach(app.unsubscribeFromStateChange);
    state.stateChangeSubscriptions = [];

    if (Transitions[state.currentPage.id] && Transitions[state.currentPage.id][page.id]) {
      Transitions[state.currentPage.id][page.id](app);
    }

    load(page);
  };

  extern.init = function() {
    load(state.currentPage);
  };

  extern.addButtonClicked = function() {
    state.currentPage.addButtonClicked(extern, app);
  };

  extern.subtractButtonClicked = function() {
    state.currentPage.subtractButtonClicked(extern, app);
  };

  extern.nextPageClicked = function() {
    if (state.currentPage.beforeNextPage) {
      state.currentPage.beforeNextPage(extern, app);
    }
    transitionTo(Pages[state.currentPage.nextPageId]);
  };

  return extern;
}
