// TODO: Wire up UI to core
import document from 'document';

console.log("App Started");

// If you comment out the following line, then `onactivate` will fire
// and "Button activated" will be logged. Otherwise, `onactivate` is never fired.
const page = document.getElementById('page');


const button = document.getElementById('fire-activate');

button.onactivate = (e) => {
  console.log('Button activated');
};
