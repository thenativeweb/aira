import { getMillisecondsFromDuration } from './getMillisecondsFromDuration';
import { getNoteValue } from '../../midi/getNoteValue';
import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';

const handleStep = function ({ step, track, bpm }: {
  step: Step;
  track: Track;
  bpm: number;
}): void {
  for (const controller of step.controllers) {
    track.synthesizer.setController(controller);
  }

  for (const note of step.notes) {
    track.synthesizer.playNote({
      noteValue: getNoteValue(note),
      velocity: note.velocity,
      duration: getMillisecondsFromDuration({ duration: note.duration, bpm })
    });
  }
};

export { handleStep };
