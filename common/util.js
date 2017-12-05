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

export function prependWithMaxLength(maxLength, list, item) {
  list.unshift(item);
  if (list.length > maxLength) {
    list.splice(list.length - 1, list.length - maxLength);
  }
  return list;
}
