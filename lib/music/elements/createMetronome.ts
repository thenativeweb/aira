import { setTimeout } from 'timers/promises';

const pulsesPerBeat = 24;

const createMetronome = async function * ({ bpm }: {
  bpm: number;
}): AsyncGenerator<number, void, undefined> {
  const millisecondsPerPulse = 60_000 / bpm / pulsesPerBeat;
  let pulseCounter = 0;

  while (true) {
    const cancel = yield pulseCounter;

    if (cancel) {
      return;
    }

    await setTimeout(millisecondsPerPulse);
    pulseCounter = (pulseCounter + 1) % 24;
  }
};

export { createMetronome };
