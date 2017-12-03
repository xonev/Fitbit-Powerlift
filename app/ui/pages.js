import {listItems, scrollViews} from './list';
import * as Exercise from '../core/exercise';

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
      app.addExercise();
    },
    listItemClicked: (ui, app, index) => {
      app.selectExerciseByIndex(index);
      ui.transitionTo(Pages.sets);
    }
  },
  muscleGroupSelection: {
    id: 'muscleGroupSelection',
    activeElements: [
      'title'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: [],
    listItemClicked: (ui, app, index) => {
      app.selectMuscleGroupByIndex(index);
      ui.transitionTo(Pages.exerciseSelection);
    }
  },
  exerciseSelection: {
    id: 'exerciseSelection',
    activeElements: [
      'title'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: [],
    listItemClicked: (ui, app, index) => {
      app.selectExerciseTypeByIndex(index);
      ui.transitionTo(Pages.weight);
    }
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
        statePathId: Exercise.notifyIds.currentSetWeight,
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
        statePathId: Exercise.notifyIds.currentSetReps,
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
    },
    nextPageId: 'exercises'
  },
  sets: {
    id: 'sets',
    activeElements: [
      'title',
      'main-text',
      'next-page-button'
    ].concat(listItems).concat(scrollViews),
    stateToPresentations: [],
    nextPageId: 'muscleGroupSelection'
  }
};