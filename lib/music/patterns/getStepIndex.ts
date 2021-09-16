import { PulseCounter } from '../elements/PulseCounter';

const getStepIndex = function ({ beatCounter, pulseCounter }: {
  beatCounter: number;
  pulseCounter: PulseCounter;
}): number {
  const stepIndex = ((beatCounter - 1) * 24) + (pulseCounter - 1);

  return stepIndex;
};

export { getStepIndex };
