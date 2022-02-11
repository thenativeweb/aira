import { Step } from '../patterns/Step';
import { Track } from '../arrangement/Track';
import { NoteStep } from '../patterns/NoteStep';
import { ReleaseStep } from '../patterns/ReleaseStep';

const handleStep = function ({ step, track }: {
  step: Step;
  track: Track;
}): void {
  step.filter(s => s.type === 'release')
    .forEach((s) => track.synthesizer.releaseNote({
      noteValue: (s as ReleaseStep).noteValue,
      velocity: (s as ReleaseStep).velocity
    }))
  step.filter(s => s.type === 'note')
    .forEach((s) => track.synthesizer.strikeNote({
      noteValue: (s as NoteStep).noteValue,
      velocity: (s as NoteStep).velocity
    }))
  // eslint-disable-next-line default-case
  switch (step[0].type) {
    case 'note': {
      // track.synthesizer.strikeNote({
      //   noteValue: step[0].noteValue,
      //   velocity: step[0].velocity
      // });
      // break;
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
