import * as fs from 'fs';
import * as u from '../../common/util';

export function build(dependencies) {
  const filename = 'state.json';
  const lastSetsFilename = 'last-sets.json';
  const loadedFilenames = {};
  const extern = {};

  extern.saveState = (state) => {
    const {workouts, lastSets} = state;
    const workoutFilenames = workouts.map(workout => `workout-${workout.createdAt}.json`);
    const manifest = {workouts: []};
    for (let i in workouts) {
      const workout = workouts[i];
      const setFilenames = [];
      for (let j in workout.sets) {
        const set = workout.sets[j];
        const setFilename = `${workout.createdAt}-${set.createdAt}.json`;
        fs.writeFileSync(setFilename, set, 'json');
        delete loadedFilenames[setFilename];
        setFilenames.push(setFilename);
      }
      manifest.workouts.push(u.merge(workout, {sets: setFilenames}));
    }
    for (let i in manifest.workouts) {
      const workout = manifest.workouts[i];
      const workoutFilename = `${workout.createdAt}`;
      fs.writeFileSync(workoutFilename, workout, 'json');
      delete loadedFilenames[workoutFilename];
      manifest.workouts[i] = workoutFilename;
    }
    for (let key in loadedFilenames) {
      console.log(`deleting ${loadedFilenames[key]}`);
      try {
        fs.unlinkSync(loadedFilenames[key]);
      } catch (e) {
        console.log(e);
      }
    }
    fs.writeFileSync(lastSetsFilename, lastSets, 'json');
    fs.writeFileSync(filename, manifest, 'json');
  };

  extern.loadState = () => {
    try {
      const state = fs.readFileSync(filename, 'json');
      state.lastSets = [];
      for (let i in state.workouts) {
        loadedFilenames[state.workouts[i]] = state.workouts[i];
        state.workouts[i] = fs.readFileSync(state.workouts[i], 'json');
        for (let j in state.workouts[i].sets) {
          const setFilename = state.workouts[i].sets[j];
          loadedFilenames[setFilename] = setFilename;
          const set = fs.readFileSync(setFilename, 'json');
          state.workouts[i].sets[j] = set;
        }
      }
      state.lastSets = fs.readFileSync(lastSetsFilename, 'json');
      return state;
    } catch (e) {
      console.log(e);
      // file may not exist yet
      return null;
    }
  };

  extern.clearState = () => {
    return fs.unlinkSync(filename);
  };

  return extern;
}