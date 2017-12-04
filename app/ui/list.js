// These configured numbers need to match up with what is in index.gui
import * as u from './util';


export const listItems = [];
export const scrollViews = [];
export function renderList() {}
export function hideListItems() {}
/*
const numListItems = 22;
const numItemsPerScrollView = 4;
export const listItems = [
];
for (let i = 1; i < numListItems + 1; ++i) {
  listItems.push(`list-item-${i}`);
}

const numScrollViews = Math.floor(numListItems / numItemsPerScrollView);
export const scrollViews = [
];
for (let i = 1; i < numScrollViews + 1; ++i) {
  scrollViews.push(`scrollview-item-${i}`);
}

export function hideListItems() {
  listItems.forEach(u.hideElement);
  scrollViews.forEach(u.hideElement);
}

export function renderList(items) {
  const extraItems = numListItems % numItemsPerScrollView;
  const numScrollViewsNeeded = Math.floor(((items.length - extraItems) / numScrollViews) + 1);
  for (let i = 0; i < scrollViews.length; ++i) {
    const scrollViewItem = u.getElement(scrollViews[i]);
    if (i < numScrollViewsNeeded) {
      scrollViewItem.style.display = 'inherit';
    } else {
      scrollViewItem.style.display = 'none';
    }

    */
    // TODO: figure out how to set height of last list view. This doesn't work,
    // but may be a place to start:
    /*
    if (i + 1 === numScrollViewsNeeded) {
      const numItemsInLastView = (items.length - extraItems) % numItemsPerScrollView;
      const height = u.deviceHeight * numItemsInLastView / numItemsPerScrollView;
      scrollViewItem.style.height = height;
    } else {
      scrollViewItem.style.height = u.deviceHeight;
    }
    */
  /*
  }

  for (let i = 0; i < listItems.length; ++i) {
    const listItem = u.getElement(listItems[i]);
    if (i < items.length) {
      listItem.text = items[i];
    } else {
      listItem.style.display = 'none';
    }
  }
}
*/