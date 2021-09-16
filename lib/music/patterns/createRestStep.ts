import { RestStep } from './RestStep';

const createRestStep = function (): RestStep {
  return {
    type: 'rest'
  };
};

export {
  createRestStep
};
