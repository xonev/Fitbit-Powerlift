
import {units} from 'user-settings';

const WeightUnits = {
  metric: 'kg',
  us: 'lb'
};

console.log(units.weight);
export function build(dependencies) {
  const extern = {};

  if (!WeightUnits[units.weight]) {
    throw new Error('Unknown weight units setting');
  }

  extern.weightUnit = WeightUnits[units.weight];

  return extern;
}