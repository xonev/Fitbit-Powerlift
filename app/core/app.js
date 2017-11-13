import * as u from '../../common/util';
import * as Workout from './workout';

export function build(dependencies = {}, initialState = {}) {
  const extern = {};
  const defaultInitialState = {
    workouts: [],
    currentWorkout: null
  };

  let state = u.merge(defaultInitialState, initialState);

  extern.newWorkout = function() {
    state = u.merge(state, {
      currentWorkout: Workout.create()
    });
    return state;
  };

  extern.addExercise = function() {

  };

  extern.addWeight = function(amount) {
    state.currentWorkout.currentExercise.weight += amount;
    return state.currentWorkout.currentExercise.weight;
  };

  extern.addReps = function(amount) {
    state.currentWorkout.currentExercise.reps += amount;
    return state.currentWorkout.currentExercise.reps;
  }

  extern.getCurrentExercise = function() {
    return state.currentWorkout.currentExercise;
  }

  return extern;
}
