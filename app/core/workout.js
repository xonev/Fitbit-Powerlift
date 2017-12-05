import * as u from '../../common/util';

export function create() {
  return {
    exercises: [],
    createdAt: new Date().toISOString()
  };
}

export function selectExerciseByIndex(workout, index) {
  return workout.exercises[index];
}

export function addExercise(workout, exercise) {
  if (!workout.exercises) {
    throw new Error('Invalid workout');
  }
  workout.exercises = u.prependWithMaxLength(5, workout.exercises, exercise);
  workout.currentExercise = exercise;
  return workout;
}

export function getExercises(workout) {
  if (!workout.exercises) {
    throw new Error('Invalid workout');
  }
  return workout.exercises;
}

export function getNumExercises(workout) {
  return workout.exercises.length;
}