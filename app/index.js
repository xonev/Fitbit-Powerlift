// TODO: Wire up UI to core
import * as App from 'core/app';
import * as UI from 'ui';
import {Pages} from 'ui';
import {getElement} from 'ui/util';

const app = App.build({}, {
  currentWorkout: {
    exercises: [],
    currentExercise: {
      weight: 5,
      reps: 10
    }
  },
});

const ui = UI.build({app}, {
  currentPage: Pages.weight
});

console.log("App Started");

const button = getElement('add-button');
const button2 = getElement('subtract-button');
const weight = getElement('main-datum');
const toRepsButton = getElement('next-page-button');

button.onactivate = (e) => {
  ui.addButtonClicked();
};

button2.onactivate = (e) => {
  ui.subtractButtonClicked();
};

toRepsButton.onactivate = (e) => {
  ui.nextPageClicked();
};
