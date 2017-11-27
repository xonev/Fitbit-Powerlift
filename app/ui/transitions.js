import * as u from './util';
import {hideListItems, renderList} from './list';
import {MuscleGroups} from '../core/exercise';

export const Transitions = {
  '*': {
    home: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'PowerLift: Workouts';

      const mainText = u.getElement('main-text');
      if (app.getNumWorkouts() === 0) {
        hideListItems();
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any workouts yet!';
      } else {
        mainText.style.display = 'none';
      }

      const nextPageButton = u.getElement('next-page-button');
      nextPageButton.text = '+ Workout';
    },
    exercises: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'PowerLift: Exercises';

      const mainText = u.getElement('main-text');
      if (app.getNumExercises() === 0) {
        hideListItems();
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any exercises yet!';
      } else {
        mainText.style.display = 'none';
      }

      const nextPageButton = u.getElement('next-page-button');
      nextPageButton.text = '+ Exercise';
    },
    muscleGroupSelection: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'PowerLift: Muscle Group';

      renderList(MuscleGroups.map((group) => group.name));
    },
    weight: () => {
      const titleText = u.getElement('title');
      titleText.text = 'PowerLift: Set Weight';
      const addButton = u.getElement('add-button');
      const subtractButton = u.getElement('subtract-button');
      const mainDatum = u.getElement('main-datum');
      const nextPageButton = u.getElement('next-page-button');
      addButton.text = '+5 lbs';
      subtractButton.text = '-5 lbs';
      mainDatum.text = '20 lbs';
      nextPageButton.text = 'To Reps';
    },
    reps: () => {
      const titleText = u.getElement('title');
      titleText.text = 'PowerLift: Set Reps';
      const addButton = u.getElement('add-button');
      const subtractButton = u.getElement('subtract-button');
      const mainDatum = u.getElement('main-datum');
      const nextPageButton = u.getElement('next-page-button');
      addButton.text = '+1 Rep';
      subtractButton.text = '-1 Rep';
      mainDatum.text = '10 Reps';
      nextPageButton.text = 'Add Set';
    }
  }
};
