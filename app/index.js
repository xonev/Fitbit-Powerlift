// TODO: Wire up UI to core
import * as App from 'core/app';
import * as UI from 'ui';
import {Pages} from 'ui';
import {getElement} from 'ui/util';

const app = App.build({}, {
  currentWorkout: {
    exercises: [],
    currentExercise: {
      weight: 5
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

function updateWeight() {
  weight.text = `${app.getCurrentExercise().weight} lbs`;
}

button.onactivate = (e) => {
  console.log('+5 lbs');
  app.addWeight(5);
  updateWeight();
};

button2.onactivate = (e) => {
  console.log('-5 lbs');
  app.addWeight(-5);
  updateWeight();
};

toRepsButton.onactivate = (e) => {
  ui.transitionTo(Pages.reps);
};
