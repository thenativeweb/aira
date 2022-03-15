import { Stop } from './Stop';

interface Player {
  play: () => Promise<Stop>;
}

export { Player };
