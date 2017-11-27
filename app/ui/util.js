import document from 'document';

export const deviceHeight = 250;
export const deviceWidth = 348;

const elements = {};

export function getElement(id) {
  if (!elements[id]) {
    elements[id] = document.getElementById(id);
  }
  return elements[id];
}

export function hideElement(elId) {
  const el = getElement(elId);
  el.style.display = 'none';
}

export function scrollTop() {
  document.scrollTo(0, 0);
}
