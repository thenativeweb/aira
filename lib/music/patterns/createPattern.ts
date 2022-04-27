import { createStep } from './createStep';
import { Pattern } from './Pattern';
import { Step } from './Step';
import * as errors from '../../errors';

const maxStepsPerBar = 96;

const createPattern = function (steps: Step[]): Pattern {
  if (steps.length === 0) {
    throw new errors.PatternLengthInvalid();
  }
  if (steps.length > maxStepsPerBar) {
    throw new errors.PatternLengthInvalid();
  }
  if (maxStepsPerBar % steps.length !== 0) {
    throw new errors.PatternLengthInvalid();
  }

  const factor = maxStepsPerBar / steps.length;
  const stepsToFillIn = factor - 1;

  const pattern: Step[] = [];

  for (const step of steps) {
    pattern.push(step);

    for (let i = 0; i < stepsToFillIn; i++) {
      pattern.push(createStep());
    }
  }

  return pattern;
};

export { createPattern, maxStepsPerBar };
