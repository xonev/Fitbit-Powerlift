import {MuscleGroups, ExercisesByGroup} from './exercise/exercise_types';

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