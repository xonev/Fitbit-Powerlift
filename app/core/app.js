import * as u from '../../common/util';
import * as Workout from './workout';
import * as Exercise from './exercise';
import * as Set from './set';

export function build(dependencies = {}, initialState = {}) {
  const extern = {};
  const defaultInitialState = {
    workouts: [],
    currentWorkout: null,
    lastSets: {}
  };

  let state = u.merge(defaultInitialState, initialState);
  const stateChangeSubscriptions = {};
  let idCount = 0;

  function notifyStateChange(statePathId, value) {
    if (!stateChangeSubscriptions[statePathId]) return;
    const keys = Object.keys(stateChangeSubscriptions[statePathId]);
    keys.forEach(key => stateChangeSubscriptions[statePathId][key](value, state));
  }

  function getState(statePathId) {
    const path = statePathId.split('.');
    return path.reduce((val, pathComponent, index) => {
      if (typeof val === 'object' && val !== null) {
        return val[pathComponent];
      } else if (index !== path.length) {
        return null;
      }
      return val;
    }, state);
  }

  extern.subscribeToStateChange = function(statePathId, callback) {
    if (!stateChangeSubscriptions[statePathId]) {
      stateChangeSubscriptions[statePathId] = {};
    }
    const id = idCount;
    idCount += 1;
    stateChangeSubscriptions[statePathId][id] = callback;
    callback(getState(statePathId), state);
    return {statePathId, id};
  };

  extern.unsubscribeFromStateChange = function({statePathId, id}) {
    delete stateChangeSubscriptions[statePathId][id];
  }

  extern.getNumWorkouts = function() {
    return state.workouts.length;
  };

  extern.getWorkouts = function() {
    return state.workouts;
  };

  extern.newWorkout = function() {
    const workout = Workout.create();
    state = u.merge(state, {
      currentWorkout: workout
    });
    state.workouts.unshift(workout);
    notifyStateChange('currentWorkout', state.currentWorkout);
    return state;
  };

  extern.getNumExercises = function() {
    return Workout.getNumExercises(state.currentWorkout);
  };

  extern.getExercises = function() {
    return Workout.getExercises(state.currentWorkout);
  };

  extern.getCurrentSets = function() {
    return Exercise.getSets(state.currentWorkout.currentExercise);
  }

  extern.getNumCurrentSets = function() {
    return Exercise.getNumSets(state.currentWorkout.currentExercise);
  }

  extern.addExercise = function() {
    state.currentWorkout = Workout.addExercise(state.currentWorkout, Exercise.create());
  };

  extern.addSet = function() {
    let set;
    if (
      state.currentWorkout.currentExercise.type &&
      state.lastSets[state.currentWorkout.currentExercise.type.id]
    ) {
      const {id} = state.currentWorkout.currentExercise.type;
      const {weight, reps} = state.lastSets[id];
      set = Set.create({
        weight,
        reps
      });
    } else {
      set = Set.create()
    }
    state.currentWorkout.currentExercise = Exercise.addSet(
      state.currentWorkout.currentExercise,
      set
    );
  }

  extern.removeCurrentSet = function() {
    console.log('removing current set');
    state.currentWorkout.currentExercise = Exercise.removeCurrentSet(state.currentWorkout.currentExercise);
    return state.currentWorkout.currentExercise;
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
    const {currentExercise} = state.currentWorkout;
    const {currentSet} = currentExercise;

    state.lastSets[currentExercise.type.id] = currentSet;
    return state.currentWorkout.currentExercise.currentSet.weight;
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
    const {currentExercise} = state.currentWorkout;
    const {currentSet} = currentExercise;

    state.lastSets[currentExercise.type.id] = currentSet;
    return state.currentWorkout.currentExercise.currentSet.reps;
  }

  extern.selectWorkoutByIndex = function(index) {
    state.currentWorkout = state.workouts[index]
  };

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

  extern.selectSetByIndex = function(index) {
    state.currentWorkout.currentExercise = Exercise.selectCurrentSetByIndex(
      state.currentWorkout.currentExercise,
      index
    );
  }

  extern.getCurrentExercise = function() {
    return state.currentWorkout.currentExercise;
  }

  return extern;
}
