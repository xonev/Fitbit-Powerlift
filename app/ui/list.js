// These configured numbers need to match up with what is in index.gui
import {getElement, hideElement} from './util';

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
  listItems.forEach(hideElement);
  scrollViews.forEach(hideElement);
}

export function renderList(items) {
  const extraItems = numListItems % numItemsPerScrollView;
  const numScrollViewsNeeded = Math.floor(((items.length - extraItems) / numScrollViews) + 1);
  for (let i = 0; i < scrollViews.length; ++i) {
    const scrollViewItem = getElement(scrollViews[i]);
    if (i < numScrollViewsNeeded) {
      scrollViewItem.style.display = 'inherit';
    } else {
      scrollViewItem.style.display = 'none';
    }

    if (i + 1 === numScrollViewsNeeded) {
      const numItemsInLastView = (items.length - extraItems) % numItemsPerScrollView;
      const heightPct = Math.floor(numItemsInLastView * (1 / numItemsPerScrollView) * 100);
      scrollViewItem.style.height = `${heightPct}%`;
    }
  }

  for (let i = 0; i < listItems.length; ++i) {
    const listItem = getElement(listItems[i]);
    if (i < items.length) {
      listItem.text = items[i];
    } else {
      listItem.style.display = 'none';
    }
  }
}