const state = {
    workouts: [],
    currentWorkout: null
};

export function build(dependencies) {
    const extern = {};

    extern.newWorkout = function() {
        return {};
    };

    return extern;
}