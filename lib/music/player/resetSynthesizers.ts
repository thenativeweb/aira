import { setTimeout } from 'timers/promises';
import { Synthesizer } from '../../midi/Synthesizer';

const resetSynthesizers = async function ({ synthesizers }: {
  synthesizers: Synthesizer[];
}) {
  for (const synthesizer of synthesizers) {
    synthesizer.stop();
  }

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  await setTimeout(500);
};

export { resetSynthesizers };
