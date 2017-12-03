export function create() {
  return {
    exercises: []
  };
}

export function selectExerciseByIndex(workout, index) {
  return workout.exercises[index];
}

export function addExercise(workout, exercise) {
  if (!workout.exercises) {
    throw new Error('Invalid workout');
  }
  workout.exercises.push(exercise);
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