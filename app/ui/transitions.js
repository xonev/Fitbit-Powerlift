import * as u from './util';
import * as Exercise from '../core/exercise';

export const Transitions = {
  '*': {
    home: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Workouts';

      const mainText = u.getElement('main-text');
      if (app.getNumWorkouts() === 0) {
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any workouts yet!';
      } else {
        mainText.style.display = 'none';
      }

      const prevPageButton = u.getElement('home-button');
      if (app.isDirty()) {
        prevPageButton.text = 'Save';
      } else {
        prevPageButton.text = 'Saved';
      }
      const nextPageButton = u.getElement('next-page-button');
      nextPageButton.text = '+ Workout';
    },
    exercises: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Exercises';

      const mainText = u.getElement('main-text');
      if (app.getNumExercises() === 0) {
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any exercises yet!';
      } else {
        mainText.style.display = 'none';
      }

      const prevPageButton = u.getElement('home-button');
      if (app.isDirty()) {
        prevPageButton.text = 'Save';
      } else {
        prevPageButton.text = 'Home';
      }

      const nextPageButton = u.getElement('next-page-button');
      if (app.isNumSetsMaxed()) {
        nextPageButton.text = 'Maxed';
      } else {
        nextPageButton.text = '+ Exercise';
      }
    },
    muscleGroupSelection: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Muscle Group';
    },
    exerciseSelection: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Exercise';
    },
    weight: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Set Weight';
      const addButton = u.getElement('add-button');
      const subtractButton = u.getElement('subtract-button');
      const mainDatum = u.getElement('main-datum');
      const nextPageButton = u.getElement('next-page-button');
      addButton.text = `+5 ${app.getWeightUnit()}`;
      subtractButton.text = `-5 ${app.getWeightUnit()}`;
      mainDatum.text = `20 ${app.getWeightUnit()}`;
      nextPageButton.text = 'To Reps';

      const prevPageButton = u.getElement('home-button');
      prevPageButton.text = 'Cancel';
    },
    reps: (app) => {
      const titleText = u.getElement('title');
      titleText.text = 'Set Reps';
      const addButton = u.getElement('add-button');
      const subtractButton = u.getElement('subtract-button');
      const mainDatum = u.getElement('main-datum');
      const nextPageButton = u.getElement('next-page-button');
      addButton.text = '+1 Rep';
      subtractButton.text = '-1 Rep';
      mainDatum.text = '10 Reps';
      nextPageButton.text = 'Done';

      const prevPageButton = u.getElement('home-button');
      prevPageButton.text = 'Back';
    },
    sets: (app) => {
      const titleText = u.getElement('title');
      titleText.text = `${Exercise.getShortName(app.getCurrentExercise())}: Sets`;

      const nextPageButton = u.getElement('next-page-button');
      if (app.isNumSetsMaxed()) {
        nextPageButton.text = 'Sets Maxed';
      } else {
        nextPageButton.text = '+ Set';
      }

      const prevPageButton = u.getElement('home-button');
      prevPageButton.text = 'Back';

      const mainText = u.getElement('main-text');
      if (app.getNumCurrentSets() === 0) {
        mainText.style.display = 'inherit';
        mainText.text = 'You haven\'t added any sets yet!';
      } else {
        mainText.style.display = 'none';
      }
    }
  }
};
