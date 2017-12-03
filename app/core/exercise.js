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
    createdAt: new Date
  };
}

export function selectMuscleGroupByIndex(exercise, index) {
  exercise.muscleGroup = MuscleGroups[index];
  return exercise;
}

export function selectExerciseTypeByIndex(exercise, index) {
  if (!exercise.muscleGroup) {
    throw new Error('Must have a muscle group first');
  }
  exercise.type = ExercisesByGroup[exercise.muscleGroup.id][index];
  return exercise;
}

function ensureCurrentSet(exercise) {
  if (!exercise.currentSet) {
    const set = Set.create();
    exercise.currentSet = set;
    exercise.sets.push(set);
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