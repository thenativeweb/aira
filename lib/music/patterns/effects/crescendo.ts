import { createMidiValue } from '../../../midi/createMidiValue';
import { NoteStep } from '../NoteStep';
import { RestStep } from '../RestStep';
import { Step } from '../Step';

const crescendo = function (steps: Step[]): Step[] {
  const increasePerStep = Math.floor(127 / steps.length);

  return steps.map((step, index): Step => {
    if (step[0].type === 'rest') {
      return step;
    }

    return [{
      ...step[0],
      velocity: createMidiValue(increasePerStep * (index + 1))
    }];
  });
};

export { crescendo };
