import { setTimeout } from 'timers/promises';

const createMetronome = async function * ({ bpm, ppqn }: {
  bpm: number;
  ppqn: number;
}): AsyncGenerator<void, void, undefined> {
  const abortController = new AbortController();

  try {
    const millisecondsPerPulse = 60_000 / bpm / ppqn;
    const { signal } = abortController;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      await setTimeout(millisecondsPerPulse, null, { signal });
      yield;
    }
  } finally {
    abortController.abort();
  }
};

export { createMetronome };
