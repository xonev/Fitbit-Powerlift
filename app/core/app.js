import * as u from '../../common/util';
import * as Workout from './workout';
import * as Exercise from './exercise';

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

  extern.getNumExercises = function() {
    return Workout.getNumExercises(state.currentWorkout);
  };

  extern.getExercises = function() {
    return Workout.getExercises(state.currentWorkout);
  };

  extern.addExercise = function() {
    state.currentWorkout = Workout.addExercise(state.currentWorkout, Exercise.create());
  };

  extern.addWeight = function(amount) {
    state.currentWorkout.currentExercise = Exercise.incrementCurrentSetWeight(
      state.currentWorkout.currentExercise,
      amount
    );
    notifyStateChange(
      Exercise.notifyIds.currentSetWeight,
      Exercise.getCurrentSetWeight(state.currentWorkout.currentExercise)
    );
    return state.currentWorkout.currentExercise.weight;
  };

  extern.addReps = function(amount) {
    state.currentWorkout.currentExercise = Exercise.incrementCurrentSetReps(
      state.currentWorkout.currentExercise,
      amount
    );
    notifyStateChange(
      Exercise.notifyIds.currentSetReps,
      Exercise.getCurrentSetReps(state.currentWorkout.currentExercise)
    );
    return state.currentWorkout.currentExercise.reps;
  }

  extern.selectMuscleGroupByIndex = function(index) {
    state.currentWorkout.currentExercise = Exercise.selectMuscleGroupByIndex(
      state.currentWorkout.currentExercise,
      index
    );
  }

  extern.selectExerciseTypeByIndex = function(index) {
    state.currentWorkout.currentExercise = Exercise.selectExerciseTypeByIndex(
      state.currentWorkout.currentExercise,
      index
    );
  }

  extern.selectExerciseByIndex = function(index) {
    state.currentWorkout.currentExercise = Workout.selectExerciseByIndex(
      state.currentWorkout,
      index
    );
  }

  extern.getCurrentExercise = function() {
    return state.currentWorkout.currentExercise;
  }

  return extern;
}
