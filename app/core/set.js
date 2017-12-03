export function create() {
  return {
    weight: 25,
    reps: 10,
    createdAt: new Date
  };
}

export function incrementWeight(set, amount) {
  set.weight += amount;
  return set;
}

export function incrementReps(set, amount) {
  set.reps += amount;
  return set;
}