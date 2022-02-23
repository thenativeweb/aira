import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';
import { translateDuration } from './translateDuration';

const handleStep = function ({ step, track, bpm }: {
  step: Step;
  track: Track;
  bpm: number;
}): void {
  // eslint-disable-next-line default-case
  switch (step.type) {
    case 'note': {
      track.synthesizer.playNote({
        noteValue: step.noteValue,
        velocity: step.velocity,
        duration: translateDuration({ duration: step.duration, bpm})
      });
      break;
    }
    case 'rest': {
      // TODO:
      // - strike vs note aufräumen (Naming)
      // - rest vs release aufräumen (Naming)
      // - strike, release und legato implementieren
      //   - Dafür noch mal Patterns und Steps überdenken
      // - Demo-Song wieder ans Laufen bekommen
      // - Tests schreiben
      break;
    }
  }
};

export { handleStep };
