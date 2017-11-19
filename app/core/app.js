import * as u from '../../common/util';
import * as Workout from './workout';

export function build(dependencies = {}, initialState = {}) {
  const extern = {};
  const defaultInitialState = {
    workouts: [],
    currentWorkout: null
  };

  let state = u.merge(defaultInitialState, initialState);
  const stateChangeSubscriptions = {};
  let idCount = 0;

  extern.subscribeToStateChange = function(statePathId, callback) {
    if (!stateChangeSubscriptions[statePathId]) {
      stateChangeSubscriptions[statePathId] = {};
    }
    const id = idCount;
    idCount += 1;
    stateChangeSubscriptions[statePathId][id] = callback;
    return {statePathId, id};
  };

  extern.unsubscribeFromStateChange = function({statePathId, id}) {
    delete stateChangeSubscriptions[statePathId][id];
  }

  function notifyStateChange(statePathId, value) {
    if (!stateChangeSubscriptions[statePathId]) return;
    const keys = Object.keys(stateChangeSubscriptions[statePathId]);
    keys.forEach(key => stateChangeSubscriptions[statePathId][key](value, state));
  }

  extern.getNumWorkouts = function() {
    return state.workouts.length;
  };

  extern.newWorkout = function() {
    state = u.merge(state, {
      currentWorkout: Workout.create()
    });
    notifyStateChange('currentWorkout', state.currentWorkout);
    return state;
  };

  extern.addExercise = function(exercise) {
    state.currentWorkout = Workout.addExercise(state.currentWorkout, exercise);
  };

  extern.addWeight = function(amount) {
    state.currentWorkout.currentExercise.weight += amount;
    notifyStateChange('currentWorkout.currentExercise.weight', state.currentWorkout.currentExercise.weight);
    return state.currentWorkout.currentExercise.weight;
  };

  extern.addReps = function(amount) {
    state.currentWorkout.currentExercise.reps += amount;
    notifyStateChange('currentWorkout.currentExercise.reps', state.currentWorkout.currentExercise.reps);
    return state.currentWorkout.currentExercise.reps;
  }

  extern.getCurrentExercise = function() {
    return state.currentWorkout.currentExercise;
  }

  return extern;
}
