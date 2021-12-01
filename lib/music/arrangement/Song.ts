import { Bar } from '../elements/Bar';
import { Synthesizer } from '../../midi/Synthesizer';
import { Track } from '../arrangement/Track';

interface Song {
  cover: {
    title: string;
  };
  score: ({ synthesizers }: {
    synthesizers: Record<string, Synthesizer>;
  }) => {
    bpm: number;
    tracks: Track[];
    bars: Bar[];
  };
}

export { Song };
