import * as App from 'core/app';
import * as UI from 'ui';
import * as Persistence from 'persistence/state';
import * as Settings from 'persistence/settings';
import * as ConsoleLogger from '../common/console_logger';
import {Pages} from 'ui';
import {getElement} from 'ui/util';
import {listItems} from 'ui/list';

function start() {
  console.log('Initializing');
  const persistence = Persistence.build({});
  const settings = Settings.build({});
  const logger = ConsoleLogger.build({});
  const app = App.build({persistence, settings, logger}, persistence.loadState());

  const ui = UI.build({app}, {
  });

  ui.init();

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

  console.log('Initialized');
}

setTimeout(start, 0);