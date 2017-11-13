// TODO: Wire up UI to core
import document from 'document';
import * as App from 'core/app';

const app = App.build({}, {
  currentWorkout: {
    exercises: [],
    currentExercise: {
      weight: 5
    }
  },
})

console.log("App Started");

const button = document.getElementById('add-weight');
const button2 = document.getElementById('subtract-weight');
const weight = document.getElementById('weight');

function updateWeight() {
  weight.text = app.getCurrentExercise().weight;
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
