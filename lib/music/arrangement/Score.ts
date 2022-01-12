import { Bar } from '../elements/Bar';
import { Track } from './Track';

interface Score {
  bpm: number;
  tracks: Track[];
  bars: Bar[];
}

export { Score };
