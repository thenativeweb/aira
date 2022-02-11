import { createRestStep } from './createRestStep';
import { Pattern } from './Pattern';
import { Step } from './Step';
import * as errors from '../../errors';
import { createMidiValue } from '../../../lib/midi/createMidiValue';

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
      pattern.push([createRestStep()]);
    }
  }

  const velocity = createMidiValue(127);

  for (let i = 0; i < pattern.length; i++) {
    const step = pattern[i];
    for (let j = 0; j < step.length; j++) {
      const s = step[j];
      if (s.type === 'note') {
        const calculatedIndex = s.durationValue * maxStepsPerBar + i;
        if(calculatedIndex < maxStepsPerBar) {
          pattern[calculatedIndex].push({type: 'release', noteValue: s.noteValue, velocity})
        } else {
          pattern[maxStepsPerBar - 1].push({type: 'release', noteValue: s.noteValue, velocity})
        }
      }
    }
    
  }

  return pattern;
};

// const createStopPattern = function (steps: Step[]): Pattern {
//   if (steps.length !== maxStepsPerBar) {
//     throw new errors.PatternLengthInvalid();
//   }

//   const stopPattern: Step[] = Array(maxStepsPerBar).fill(createRestStep());
//   for (let i = 0; i < steps.length; i++) {
//     const step = steps[i];
//     if (step.type === 'note' ) {
//       const stopStepOffset = step.durationValue * maxStepsPerBar;
//       const stopIndex = i + stopStepOffset;
//       if(stopIndex < stopPattern.length) {
//         stopPattern[stopIndex] = createStopStep({ noteValue: step.noteValue, velocity: 127 })
//       }
//     }
//   }
//   console.log("Stop pattern: ", stopPattern)
//   return stopPattern;
// }

export { createPattern, maxStepsPerBar };
