import document from 'document';

export const deviceHeight = 250;
export const deviceWidth = 348;

export function getElement(id) {
  return document.getElementById(id);
}

export function hideElement(elId) {
  const el = getElement(elId);
  el.style.display = 'none';
}
