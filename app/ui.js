import * as u from '../common/util';
import {getElement} from 'ui/util';

export const Pages = {
  home: {
    id: 'home',
    activeElements: [
      'title',
      'list',
      'main-text',
      'next-page-button'
    ],
    stateToPresentations: [],
    nextPageId: 'weight',
    beforeNextPage: (ui, app) => {
      app.newWorkout();
      app.addExercise({weight: 20, reps: 10});
    }
  },
  weight: {
    id: 'weight',
    activeElements: [
      'add-button',
      'subtract-button',
      'main-datum',
      'next-page-button'
    ],
    stateToPresentations: [
      {
        // TODO: need a current set here
        statePathId: 'currentWorkout.currentExercise.weight',
        elementId: 'main-datum',
        elementAttribute: 'text',
        transform: lbs => `${lbs} lbs`
      }
    ],
    addButtonClicked: (ui, app) => {
      const newWeight = app.addWeight(5);
    },
    subtractButtonClicked: (ui, app) => {
      const newWeight = app.addWeight(-5);
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
    stateToPresentations: [
      {
        // TODO: need a current set here
        statePathId: 'currentWorkout.currentExercise.reps',
        elementId: 'main-datum',
        elementAttribute: 'text',
        transform: reps => `${reps} reps`
      }
    ],
    addButtonClicked: (ui, app) => {
      const newReps = app.addReps(1);
    },
    subtractButtonClicked: (ui, app) => {
      const newReps = app.addReps(-1);
    }
  }
};

// At some point, it may make sense to move this transition logic into its own
// module
const Transitions = {
  '*': {
    home: (app) => {
      const titleText = getElement('title');
      titleText.text = 'PowerLift: Workouts';

      const list = getElement('list');
      const mainText = getElement('main-text');
      if (app.getNumWorkouts() === 0) {
        list.style.display = 'none';
        mainText.style.display = 'inline';
        mainText.text = 'You haven\'t added any workouts yet!';
      } else {
        mainText.style.display = 'none';
      }

      const nextPageButton = getElement('next-page-button');
      nextPageButton.text = '+ Workout';
    },
    weight: () => {
      const addButton = getElement('add-button');
      const subtractButton = getElement('subtract-button');
      const mainDatum = getElement('main-datum');
      const nextPageButton = getElement('next-page-button');
      addButton.text = '+5 lbs';
      subtractButton.text = '-5 lbs';
      mainDatum.text = '20 lbs';
      nextPageButton.text = 'To Reps';
    },
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
    currentPage: Pages.home,
    stateChangeSubscriptions: []
  };

  const state = u.merge(defaultInitialState, initialState);

  const extern = {};

  function load(page) {
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

    page.activeElements.forEach(elementId => {
      getElement(elementId).style.display = 'inline';
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
