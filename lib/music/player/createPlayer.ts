import { createMetronome } from '../elements/createMetronome';
import { Player } from './Player';
import { resetSynthesizers } from './resetSynthesizers';
import { Song } from '../arrangement/Song';
import { Synthesizer } from '../../midi/Synthesizer';

const createPlayer = function ({ song, synthesizers }: {
  song: Song;
  synthesizers: Record<string, Synthesizer>;
}): Player {
  const score = song.score({ synthesizers });
  const metronome = createMetronome({ bpm: score.bpm });
  let isPlaying = true;

  return {
    async play () {
      await resetSynthesizers({ synthesizers: Object.values(synthesizers)});

      do {
        const { value: pulseCounter } = await metronome.next();
        // TODO
        // - Signatur als eine Art "State-Machine" bauen, die von Außen
        //   per Pulse des Metronoms getriggert wird
        // - Die Signatur liefert die Takt- und Notenwertinformationen
        // - Abhängig von deren Zustand lesen wir dann aus dem Score aus,
        //   was die nächsten abzuspielenden Noten sind
      } while (isPlaying);
    },

    async stop () {
      isPlaying = false;
      await resetSynthesizers({ synthesizers: Object.values(synthesizers)});
    }
  };
};

export { createPlayer };
