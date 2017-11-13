import * as u from '../common/util';
import {getElement} from 'ui/util';

export const Pages = {
  home: 'home',
  weight: 'weight',
  reps: 'reps'
}

const Transitions = {
  weight: {
    reps: () => {
      const addButton = getElement('add-button');
      const subtractButton = getElement('subtract-button');
      const mainDatum = getElement('main-datum');
      const nextPageButton = getElement('next-page-button');
      addButton.style.display = 'none';
      subtractButton.style.display = 'none';
      mainDatum.style.display = 'none';
      nextPageButton.style.display = 'none';
      addButton.text = '+1 Rep';
      subtractButton.text = '-1 Rep';
      mainDatum.text = '10';
      nextPageButton.text = 'Add Set';
      addButton.style.display = 'inline';
      subtractButton.style.display = 'inline';
      mainDatum.style.display = 'inline';
      nextPageButton.style.display = 'inline';
    }
  }
};

export function build(dependencies = {}, initialState = {}) {
  const defaultInitialState = {
    currentPage: Pages.home
  };

  const state = u.merge(defaultInitialState, initialState);

  const extern = {};

  extern.transitionTo = function(page) {
    Transitions[state.currentPage][page]();
    state.currentPage = page;
  }

  return extern;
}
