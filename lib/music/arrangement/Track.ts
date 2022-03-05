import { Synthesizer } from '../../midi/Synthesizer';

interface Track {
  synthesizer: Synthesizer;
  mute?: boolean;
}

export { Track };
