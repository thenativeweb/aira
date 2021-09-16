import { createMidiValue } from '../../../midi/createMidiValue';
import { Step } from '../Step';

const crescendo = function (steps: Step[]): Step[] {
  const increasePerStep = Math.floor(127 / steps.length);

  return steps.map((step, index): Step => {
    if (step.type === 'rest') {
      return step;
    }

    return {
      ...step,
      velocity: createMidiValue(increasePerStep * (index + 1))
    };
  });
};

export { crescendo };
