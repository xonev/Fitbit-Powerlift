export function create() {
    return {
        exercises: []
    };
}

export function addExercise(workout, exercise) {
    if (!workout.exercises) {
        throw new Error('Invalid workout');
    }
}