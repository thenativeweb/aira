import { createMetronome } from '../elements/createMetronome';
import { createPlayerState } from './createPlayerState';
import { createSignature } from '../elements/createSignature';
import { Player } from './Player';
import { resetSynthesizers } from './resetSynthesizers';
import { Song } from '../arrangement/Song';
import { Synthesizer } from '../../midi/Synthesizer';

const ppqn = 24;

const createPlayer = function ({ song, synthesizers }: {
  song: Song;
  synthesizers: Record<string, Synthesizer>;
}): Player {
  const playerState = createPlayerState({ initialState: 'stopped' });

  const score = song.score({ synthesizers });
  const metronome = createMetronome({ bpm: score.bpm, ppqn });
  const signature = createSignature({ ppqn });

  return {
    async play (): Promise<void> {
      await resetSynthesizers({ synthesizers: Object.values(synthesizers) });

      await playerState.requestPlay();

      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
      for await (const _ of metronome) {
        const position = signature.handlePulse();
        const bar = score.bars[position.bar];

        // TODO:
        // - Merkwürdige Ablauflogik überarbeiten (wer ruft wann wen auf, um zu
        //   stoppen, und wann stoppen wir überhaupt?)
        // - Handling von Noten verbessern, und Aufruf von playNote extrahieren
        // - Halten von Noten implementieren, um unterschiedliche lange Noten zu
        //   ermöglichen
        // - Stoppen von Noten implementieren, damit die Töne auch irgendwann
        //   mal wieder aufhören ;-)
        // - Mehr Tests

        if (!bar) {
          playerState.setStopped();
          break;
        }

        if (playerState.getState() === 'stopping') {
          break;
        }

        for (const [ trackIndex, track ] of bar.entries()) {
          const step = track[(position.beat * ppqn) + position.pulse];

          if (step.type === 'note') {
            score.tracks[trackIndex].synthesizer.playNote({
              noteValue: step.noteValue,
              velocity: step.velocity,
              length: 100
            });
          }
        }
      }

      playerState.setStopped();

      await resetSynthesizers({ synthesizers: Object.values(synthesizers) });
    },

    async stop (): Promise<void> {
      await playerState.requestStop();
    }
  };
};

export { createPlayer };
