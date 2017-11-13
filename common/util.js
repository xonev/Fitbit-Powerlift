export function merge(currentState, newState) {
    const ret = {};
    for (let prop in currentState) {
      ret[prop] = currentState[prop];
    }
    for (let prop in newState) {
      ret[prop] = newState[prop];
    }
    return ret;
}
