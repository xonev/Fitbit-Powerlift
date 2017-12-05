import * as u from '../../common/util';
import {MuscleGroups, ExercisesByGroup} from './exercise/exercise_types';
import * as Set from './set';

export const notifyIds = {
  currentSetWeight: 'currentWorkout.currentExercise.currentSet.weight',
  currentSetReps: 'currentWorkout.currentExercise.currentSet.reps'
};

export function create() {
  return {
    muscleGroup: null,
    type: null,
    sets: [],
    currentSet: null,
    createdAt: new Date().toISOString()
  };
}

export function selectMuscleGroupByIndex(exercise, index) {
  exercise.muscleGroup = MuscleGroups()[index];
  return exercise;
}

export function selectExerciseTypeByIndex(exercise, index) {
  if (!exercise.muscleGroup) {
    throw new Error('Must have a muscle group first');
  }
  exercise.type = ExercisesByGroup[exercise.muscleGroup.id]()[index];
  return exercise;
}

export function addSet(exercise, set) {
  exercise.currentSet = set;
  exercise.sets = u.prependWithMaxLength(7, exercise.sets, set);
  return exercise;
}

export function removeCurrentSet(exercise) {
  console.log('finding index');
  const currentSetIndex = exercise.sets.indexOf(exercise.currentSet);
  console.log('removing at index');
  exercise.sets.splice(currentSetIndex, 1);
  exercise.currentSet = null;
  return exercise;
}

export function getSets(exercise) {
  return exercise.sets;
}

export function getNumSets(exercise) {
  return exercise.sets.length;
}

export function selectCurrentSetByIndex(exercise, index) {
  exercise.currentSet = exercise.sets[index];
  return exercise;
}

function ensureCurrentSet(exercise) {
  if (!exercise.currentSet) {
    exercise = addSet(exercise, Set.create());
  }
  return exercise;
}

export function incrementCurrentSetWeight(exercise, amount) {
  exercise = ensureCurrentSet(exercise);
  exercise.currentSet = Set.incrementWeight(exercise.currentSet, amount);
  return exercise;
}

export function incrementCurrentSetReps(exercise, amount) {
  exercise = ensureCurrentSet(exercise);
  exercise.currentSet = Set.incrementReps(exercise.currentSet, amount);
  return exercise;
}

export function getCurrentSetWeight(exercise) {
  return exercise.currentSet.weight;
}

export function getCurrentSetReps(exercise) {
  return exercise.currentSet.reps;
}