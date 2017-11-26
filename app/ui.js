import * as u from '../common/util';
import {getElement} from 'ui/util';
import {MuscleGroups} from './core/exercise';

// These configured numbers need to match up with what is in index.gui
const numListItems = 22;
const numItemsPerScrollView = 4;
const listItems = [
];
for (let i = 1; i < numListItems + 1; ++i) {
  listItems.push(`list-item-${i}`);
}

const numScrollViews = Math.floor(numListItems / numItemsPerScrollView);
const scrollViews = [
];
for (let i = 1; i < numScrollViews + 1; ++i) {
  scrollViews.push(`scrollview-item-${i}`);
}

function hideEl(elId) {
  const el = getElement(elId);
  el.style.display = 'none';
}

function hideListItems() {
  listItems.forEach(hideEl);
  scrollViews.forEach(hideEl);
}

function renderList(items) {
  const extraItems = numListItems % numItemsPerScrollView;
  const numScrollViewsNeeded = Math.floor(((items.length - extraItems) / numScrollViews) + 1);
  for (let i = 0; i < scrollViews.length; ++i) {
    const scrollViewItem = getElement(scrollViews[i]);
    if (i < numScrollViewsNeeded) {
      scrollViewItem.style.display = 'inherit';
    } else {
      console.log(`hiding scrollview-item: ${scrollViews[i]}`);
      scrollViewItem.style.display = 'none';
    }

    if (i + 1 === numScrollViewsNeeded) {
      const numItemsInLastView = (items.length - extraItems) % numItemsPerScrollView;
      const heightPct = Math.floor(numItemsInLastView * (1 / numItemsPerScrollView) * 100);
      scrollViewItem.style.height = `${heightPct}%`;
    }
  }

  for (let i = 0; i < listItems.length; ++i) {
    const listItem = getElement(listItems[i]);
    if (i < items.length) {
      listItem.text = items[i];
    } else {
      listItem.style.display = 'none';
    }
  }
}

export const Pages = {
  home: {
    id: 'home',
    activeElements: [
      'title',
      'main-text',
      'next-page-button'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: [],
    nextPageId: 'exercises',
    beforeNextPage: (ui, app) => {
      app.newWorkout();
    }
  },
  exercises: {
    id: 'exercises',
    activeElements: [
      'title',
      'main-text',
      'next-page-button'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: [],
    nextPageId: 'muscleGroupSelection',
    beforeNextPage: (ui, app) => {
      app.addExercise({weight: 25, reps: 10});
    }
  },
  muscleGroupSelection: {
    id: 'muscleGroupSelection',
    activeElements: [
      'title'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: []
  },
  weight: {
    id: 'weight',
    activeElements: [
      'title',
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
      'title',
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

      const mainText = getElement('main-text');
      if (app.getNumWorkouts() === 0) {
        hideListItems();
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any workouts yet!';
      } else {
        mainText.style.display = 'none';
      }

      const nextPageButton = getElement('next-page-button');
      nextPageButton.text = '+ Workout';
    },
    exercises: (app) => {
      const titleText = getElement('title');
      titleText.text = 'PowerLift: Exercises';

      const mainText = getElement('main-text');
      if (app.getNumExercises() === 0) {
        hideListItems();
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any exercises yet!';
      } else {
        mainText.style.display = 'none';
      }

      const nextPageButton = getElement('next-page-button');
      nextPageButton.text = '+ Exercise';
    },
    muscleGroupSelection: (app) => {
      const titleText = getElement('title');
      titleText.text = 'PowerLift: Muscle Group';

      renderList(MuscleGroups.map((group) => group.name));
    },
    weight: () => {
      const titleText = getElement('title');
      titleText.text = 'PowerLift: Set Weight';
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
      const titleText = getElement('title');
      titleText.text = 'PowerLift: Set Reps';
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
