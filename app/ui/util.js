import document from 'document';

const elements = {};

export function getElement(id) {
  if (!elements[id]) {
    elements[id] = document.getElementById(id);
  }
  return elements[id];
}
