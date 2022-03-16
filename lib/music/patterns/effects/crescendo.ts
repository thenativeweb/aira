import { createMidiValue } from '../../../midi/createMidiValue';
import { NoteStep } from '../NoteStep';
import { Step } from '../Step';

const crescendo = function (steps: Step[]): Step[] {
  const increasePerStep = Math.floor(127 / steps.length);

  // eslint-disable-next-line array-callback-return
  return steps.map((step, index): Step => {
    // eslint-disable-next-line default-case
    switch (step.type) {
      case 'multiNote': {
        return {
          ...step,
          type: 'multiNote',
          steps: step.steps.map(
            (innerStep): NoteStep => ({
              ...innerStep,
              velocity: createMidiValue(increasePerStep * (index + 1))
            })
          )
        };
      }
      case 'note': {
        return {
          ...step,
          velocity: createMidiValue(increasePerStep * (index + 1))
        };
      }
      case 'rest': {
        return step;
      }
    }
  });
};

export { crescendo };
