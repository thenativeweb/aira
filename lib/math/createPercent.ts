import { Percent } from './Percent';
import * as errors from '../errors';

const createPercent = function (value: number): Percent {
  if (value < 0 || value > 100) {
    throw new errors.PercentOutOfRange();
  }

  return value;
};

export { createPercent };
