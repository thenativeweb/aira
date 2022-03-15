import { Bar } from '../elements/Bar';
import { Track } from './Track';

interface Score {
  bpm: number;
  tracks: Record<string, Track>;
  bars: Bar[];
}

export { Score };
