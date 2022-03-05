import { RestStep } from './RestStep';
import { Step } from './Step';

const isRestStep = function (step: Step): step is RestStep {
  return step.type === 'rest';
};

export { isRestStep };
