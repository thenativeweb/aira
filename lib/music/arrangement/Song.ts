import { Score } from './Score';
import { Synthesizer } from '../../midi/Synthesizer';

interface Song {
  cover: {
    title: string;
  };
  score: ({ synthesizers }: {
    synthesizers: Record<string, Synthesizer>;
  }) => Score;
}

export { Song };
