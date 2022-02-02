import { createMetronome } from '../elements/createMetronome';
import { createSignature } from '../elements/createSignature';
import { loop } from './loop';
import { Player } from './Player';
import { ppqn } from './ppqn';
import { resetSynthesizers } from './resetSynthesizers';
import { Song } from '../arrangement/Song';
import { Stop } from './Stop';
import { Synthesizer } from '../../midi/Synthesizer';

const createPlayer = function ({ song, synthesizers }: {
  song: Song;
  synthesizers: Record<string, Synthesizer>;
}): Player {
  const score = song.score({ synthesizers });

  return {
    async play (): Promise<Stop> {
      const abortController = new AbortController();
      const abortSignal = abortController.signal;

      const metronome = createMetronome({ bpm: score.bpm, ppqn, abortSignal });
      const signature = createSignature({ ppqn });

      const stop = async function (): Promise<void> {
        abortController.abort();

        await resetSynthesizers({ synthesizers: Object.values(synthesizers) });
      };

      await resetSynthesizers({ synthesizers: Object.values(synthesizers) });

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loop({ score, metronome, signature, stop });

      return stop;
    }
  };
};

export { createPlayer };
