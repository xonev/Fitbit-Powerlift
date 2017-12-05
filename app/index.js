import * as App from 'core/app';
import * as UI from 'ui';
import * as Persistence from './persistence/state';
import {Pages} from 'ui';
import {getElement} from 'ui/util';
import {listItems} from 'ui/list';

const persistence = Persistence.build({});
const app = App.build({persistence}, persistence.loadState());

const ui = UI.build({app}, {
});

ui.init();
console.log("Initialized");

const button = getElement('add-button');
const button2 = getElement('subtract-button');
const weight = getElement('main-datum');
const toRepsButton = getElement('next-page-button');
const backButton = getElement('home-button');

button.onactivate = (e) => {
  ui.addButtonClicked();
};

button2.onactivate = (e) => {
  ui.subtractButtonClicked();
};

toRepsButton.onactivate = (e) => {
  ui.nextPageClicked();
};

backButton.onactivate = (e) => {
  ui.prevPageClicked();
};