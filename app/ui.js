import * as u from '../common/util';
import * as uiu from 'ui/util';
import {Pages} from 'ui/pages';
import {Transitions} from 'ui/transitions';
import document from 'document';

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
      uiu.getElement(elementId).style.display = 'inherit';
    });

    if (Transitions['*'][page.id]) {
      Transitions['*'][page.id](app);
    }

    page.stateToPresentations.forEach(stateToPresentation => {
      const {elementId, elementAttribute, transform, statePathId} = stateToPresentation;
      const subscriptionId = app.subscribeToStateChange(statePathId, newState => {
        uiu.getElement(elementId)[elementAttribute] = transform(newState);
      });
      state.stateChangeSubscriptions.push(subscriptionId);
    });

    state.currentPage = page;
  }

  const transitionTo = extern.transitionTo = function(page) {
    state.currentPage.activeElements.forEach(elementId => {
      uiu.getElement(elementId).style.display = 'none';
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

  extern.listItemClicked = function(index) {
    console.log(`item ${index} clicked`);
    state.currentPage.listItemClicked(extern, app, index);
  }

  return extern;
}
