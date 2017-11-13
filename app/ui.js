import * as u from '../common/util';
import {getElement} from 'ui/util';

export const Pages = {
  home: {
    id: 'home',
    activeElements: [
    ]
  },
  weight: {
    id: 'weight',
    activeElements: [
      'add-button',
      'subtract-button',
      'main-datum',
      'next-page-button'
    ],
    addButtonClicked: (ui, app) => {
      const newWeight = app.addWeight(5);
      getElement('main-datum').text = `${app.getCurrentExercise().weight} lbs`;
    },
    subtractButtonClicked: (ui, app) => {
      const newWeight = app.addWeight(-5);
      getElement('main-datum').text = `${app.getCurrentExercise().weight} lbs`;
    },
    nextPageId: 'reps'
  },
  reps: {
    id: 'reps',
    activeElements: [
      'add-button',
      'subtract-button',
      'main-datum',
      'next-page-button'
    ],
    addButtonClicked: (ui, app) => {
      const newReps = app.addReps(1);
      getElement('main-datum').text = `${app.getCurrentExercise().reps} reps`;
    },
    subtractButtonClicked: (ui, app) => {
      const newReps = app.addReps(-1);
      getElement('main-datum').text = `${app.getCurrentExercise().reps} reps`;
    }
  }
}

const Transitions = {
  weight: {
    reps: () => {
      const addButton = getElement('add-button');
      const subtractButton = getElement('subtract-button');
      const mainDatum = getElement('main-datum');
      const nextPageButton = getElement('next-page-button');
      addButton.text = '+1 Rep';
      subtractButton.text = '-1 Rep';
      mainDatum.text = '10 Reps';
      nextPageButton.text = 'Add Set';
    }
  }
};

export function build(dependencies = {}, initialState = {}) {
  const {app} = dependencies;

  const defaultInitialState = {
    currentPage: Pages.home
  };

  const state = u.merge(defaultInitialState, initialState);

  const extern = {};

  function transitionTo(page) {
    state.currentPage.activeElements.forEach(elementId => {
      getElement(elementId).style.display = 'none';
    });
    Transitions[state.currentPage.id][page.id]();
    page.activeElements.forEach(elementId => {
      getElement(elementId).style.display = 'inline';
    });
    state.currentPage = page;
  };

  extern.addButtonClicked = function() {
    state.currentPage.addButtonClicked(extern, app);
  };

  extern.subtractButtonClicked = function() {
    state.currentPage.subtractButtonClicked(extern, app);
  };

  extern.nextPageClicked = function() {
    transitionTo(Pages[state.currentPage.nextPageId]);
  };

  return extern;
}
