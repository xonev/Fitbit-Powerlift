import document from 'document';

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
