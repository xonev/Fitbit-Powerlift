import * as Exercise from '../core/exercise';
import { MuscleGroups, ExercisesByGroup } from '../core/exercise/exercise_types';

export const Pages = {
  home: {
    id: 'home',
    mainHeight: () => 250,
    activeElements: [
      'title',
      'main-text',
      'next-page-button'
    ],
    stateToPresentations: [],
    nextPageId: 'exercises',
    beforeNextPage: (ui, app) => {
      app.newWorkout();
    },
    getListLength: () => {
      return 0;
    }
  },
  exercises: {
    id: 'exercises',
    mainHeight: (ui, app) => app.getNumExercises() > 0 ? 125 : 250,
    activeElements: [
      'title',
      'main-text',
      'next-page-button'
    ],
    stateToPresentations: [],
    nextPageId: 'muscleGroupSelection',
    beforeNextPage: (ui, app) => {
      app.addExercise();
    },
    getListLength: (ui, app) => app.getNumExercises(),
    getTileInfo: (ui, app, index) => ({
        type: 'editable-item-pool',
        index
    }),
    configureTile: (ui, app, tile, tileInfo) => {
      const listIndex = tileInfo.index;
      const exercise = app.getExercises()[listIndex];
      const noun = exercise.sets.length === 1 ? 'set' : 'sets';
      const title = tile.getElementById('item-title');
      title.text = `${exercise.type.name}: ${exercise.sets.length} ${noun}`;

      const edit = tile.getElementById('edit-button');
      edit.onactivate = () => {
        app.selectExerciseByIndex(listIndex);
        ui.transitionTo(Pages.sets);
      }
    }
  },
  muscleGroupSelection: {
    id: 'muscleGroupSelection',
    mainHeight: () => 75,
    activeElements: [
      'title'
    ],
    stateToPresentations: [],
    getListLength: (ui, app) => MuscleGroups.length,
    getTileInfo: (ui, app, index) => ({
      type: 'selectable-item-pool',
      index
    }),
    configureTile: (ui, app, tile, tileInfo) => {
      const editButton = tile.getElementById('select-button');
      editButton.text = MuscleGroups[tileInfo.index].name;
      editButton.onactivate = () => {
        app.selectMuscleGroupByIndex(tileInfo.index);
        ui.transitionTo(Pages.exerciseSelection);
      };
    }
  },
  exerciseSelection: {
    id: 'exerciseSelection',
    mainHeight: () => 75,
    activeElements: [
      'title'
    ],
    stateToPresentations: [],
    getListLength: (ui, app) => ExercisesByGroup[app.getCurrentExercise().muscleGroup.id].length,
    getTileInfo: (ui, app, index) => ({
      type: 'selectable-item-pool',
      index
    }),
    configureTile: (ui, app, tile, tileInfo) => {
      const editButton = tile.getElementById('select-button');
      const exercises = ExercisesByGroup[app.getCurrentExercise().muscleGroup.id];
      editButton.text = exercises[tileInfo.index].name;
      editButton.onactivate = () => {
        app.selectExerciseTypeByIndex(tileInfo.index);
        ui.transitionTo(Pages.weight);
      }
    }
  },
  weight: {
    id: 'weight',
    mainHeight: () => 250,
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
    mainHeight: () => 250,
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
    mainHeight: () => 125,
    activeElements: [
      'title',
      'next-page-button'
    ],
    stateToPresentations: [],
    nextPageId: 'weight',
    beforeNextPage: (ui, app) => {
      app.addSet();
    },
    getListLength: (ui, app) => app.getCurrentSets().length,
    getTileInfo: (ui, app, index) => ({
      type: 'editable-item-pool',
      index
    }),
    configureTile: (ui, app, tile, tileInfo) => {
      const title = tile.getElementById('item-title');
      const set = app.getCurrentSets()[tileInfo.index];
      title.text = `${set.weight} lbs x ${set.reps} reps`;

      const edit = tile.getElementById('edit-button');
      edit.onactivate = () => {
        app.selectSetByIndex(tileInfo.index);
        ui.transitionTo(Pages.weight);
      };
    }
  }
};