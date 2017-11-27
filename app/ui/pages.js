import {listItems, scrollViews} from './list';

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