import * as App from 'core/app';
import * as UI from 'ui';
import {Pages} from 'ui';
import {getElement} from 'ui/util';

const app = App.build({}, {
});

const ui = UI.build({app}, {
});

ui.init();
console.log("Initialized");

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
