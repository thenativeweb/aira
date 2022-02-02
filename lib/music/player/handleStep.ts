import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';

const handleStep = function ({ step, track }: {
  step: Step;
  track: Track;
}): void {
  // eslint-disable-next-line default-case
  switch (step.type) {
    case 'note': {
      track.synthesizer.strikeNote({
        noteValue: step.noteValue,
        velocity: step.velocity
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
