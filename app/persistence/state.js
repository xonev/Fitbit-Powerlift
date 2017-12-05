import * as fs from 'fs';

export function build(dependencies) {
  const filename = 'state.db';
  const extern = {};

  extern.saveState = (state) => {
    fs.writeFileSync(filename, state, 'json');
  };

  extern.loadState = () => {
    try {
      return fs.readFileSync(filename, 'json');
    } catch (e) {
      console.log(e);
      // file may not exist yet
      return null;
    }
  };

  extern.clearState = () => {
    return fs.unlinkSync(filename);
  };

  return extern;
}