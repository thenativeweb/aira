import { createMidiValue } from '../../../midi/createMidiValue';
import { NoteStep } from '../NoteStep';
import { Step } from '../Step';

const crescendo = function (steps: Step[]): Step[] {
  const increasePerStep = Math.floor(127 / steps.length);

  const stepsWithCrescendo = steps.map((step, index): Step =>
    ({
      ...step,
      notes: step.notes.map((note): NoteStep => ({
        ...note,
        velocity: createMidiValue(increasePerStep * (index + 1))
      }))
    }));

  return stepsWithCrescendo;
};

export { crescendo };
