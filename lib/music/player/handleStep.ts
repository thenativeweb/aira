import { getMillisecondsFromDuration } from './getMillisecondsFromDuration';
import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';

const handleStep = function ({ step, track, bpm }: {
  step: Step;
  track: Track;
  bpm: number;
}): void {
  // eslint-disable-next-line default-case
  switch (step.type) {
    case 'multiNote': {
      for (const innerStep of step.steps) {
        handleStep({ step: innerStep, track, bpm });
      }
      break;
    }
    case 'note': {
      track.synthesizer.playNote({
        noteValue: step.noteValue,
        velocity: step.velocity,
        duration: getMillisecondsFromDuration({ duration: step.duration, bpm })
      });
      break;
    }
    case 'rest': {
      break;
    }
  }
};

export { handleStep };
