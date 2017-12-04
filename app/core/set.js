import * as u from '../../common/util';

export function create(overrides = {}) {
  return u.merge({
    weight: 25,
    reps: 10,
    createdAt: new Date
  }, overrides);
}

export function incrementWeight(set, amount) {
  set.weight += amount;
  return set;
}

export function incrementReps(set, amount) {
  set.reps += amount;
  return set;
}