import { Metronome } from './Metronome';
import { setTimeout } from 'timers/promises';

const createMetronome = async function * ({ bpm, ppqn, abortSignal }: {
  bpm: number;
  ppqn: number;
  abortSignal: AbortSignal;
}): Metronome {
  const millisecondsPerPulse = 60_000 / bpm / ppqn;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      await setTimeout(millisecondsPerPulse, null, { signal: abortSignal });
      yield;
    }
  } catch (ex: unknown) {
    if ((ex as any).code === 'ABORT_ERR') {
      return;
    }

    throw ex;
  }
};

export { createMetronome };
