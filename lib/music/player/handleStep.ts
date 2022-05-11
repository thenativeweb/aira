import { getMillisecondsFromDuration } from './getMillisecondsFromDuration';
import { getNoteValue } from '../../midi/getNoteValue';
import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';

const handleStep = function ({ step, track, bpm }: {
  step: Step;
  track: Track;
  bpm: number;
}): void {
  for (const controllerStep of step.controllerSteps) {
    track.synthesizer.setController(controllerStep);
  }

  for (const noteStep of step.noteSteps) {
    track.synthesizer.playNote({
      noteValue: getNoteValue(noteStep),
      velocity: noteStep.velocity,
      duration: getMillisecondsFromDuration({ duration: noteStep.duration, bpm })
    });
  }
};

export { handleStep };
