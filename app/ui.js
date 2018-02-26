import * as u from '../common/util';
import * as uiu from './ui/util';
import {Pages} from './ui/pages';
import {Transitions} from './ui/transitions';
import document from 'document';

export function build(dependencies = {}, initialState = {}) {
  const {app} = dependencies;

  const defaultInitialState = {
    currentPage: Pages.home,
    stateChangeSubscriptions: [],
    tileList: uiu.getElement('tile-list')
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
        uiu.getElement(elementId)[elementAttribute] = transform(extern, app, newState);
      });
      state.stateChangeSubscriptions.push(subscriptionId);
    });

    state.currentPage = page;

    if (page.getListLength) {
      // Add one for the main tile.
      state.tileList.length = page.getListLength(extern, app) + 1;
    } else {
      state.tileList.length = 1;
    }
    state.tileList.redraw();
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
    const {tileList} = state;
    tileList.delegate = {
      configureTile: (tile, tileInfo) => {
        if (tileInfo.index === 0) {
          tile.height = state.currentPage.mainHeight ? state.currentPage.mainHeight(extern, app) : 250;
        } else if (state.currentPage.configureTile) {
          state.currentPage.configureTile(
            extern,
            app,
            tile,
            u.merge(tileInfo, {index: tileInfo.index - 1})
          );
        }
      },
      getTileInfo: (index) => {
        if (index === 0) {
          return {
            type: 'main-tile-pool',
            index
          };
        } else if (state.currentPage.getTileInfo) {
          return state.currentPage.getTileInfo(extern, app, index);
        }
      }
    };
    load(state.currentPage);
  };

  extern.addButtonClicked = function() {
    state.currentPage.addButtonClicked(extern, app);
  };

  extern.subtractButtonClicked = function() {
    state.currentPage.subtractButtonClicked(extern, app);
  };

  extern.nextPageClicked = function() {
    if (state.currentPage.beforeNextPage &&
      state.currentPage.beforeNextPage(extern, app) === false
    ) {
        return;
    }
    transitionTo(Pages[state.currentPage.nextPageId]);
  };

  extern.prevPageClicked = function() {
    if (state.currentPage.prevPageClicked) {
      state.currentPage.prevPageClicked(extern, app);
    } else {
      if (state.currentPage.beforePrevPage) {
        state.currentPage.beforePrevPage(extern, app);
      }
      transitionTo(Pages[state.currentPage.prevPageId]);
    }
  };

  return extern;
}
