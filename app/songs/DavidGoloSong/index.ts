import {
  __,
  bass,
  bassdrum,
  closedHihat,
  crashCymbal,
  snaredrum
} from './patterns';
import { Song, Synthesizer } from '../../../lib/aira';

class DavidGoloSong extends Song {
  public constructor ({ synthesizers }: {
    synthesizers: {
      tr8: Synthesizer;
      tb3: Synthesizer;
      system8: Synthesizer;
    };
  }) {
    super({
      loopLastBar: true,
      bpm: 137,
      tracks: [
        { name: 'Bassdrum', synthesizer: synthesizers.tr8 },
        { name: 'Snaredrum', synthesizer: synthesizers.tr8 },
        { name: 'Closed Hihat', synthesizer: synthesizers.tr8 },
        { name: 'Crash Cymbal', synthesizer: synthesizers.tr8 },
        { name: 'Bass Sawwave', synthesizer: synthesizers.tb3 }
      ],
      bars: [
        /* eslint-disable no-multi-spaces */
        [ bassdrum.a, __,          closedHihat.a, crashCymbal.c, bass.a ],
        [ bassdrum.b, __,          closedHihat.a, __,            bass.a ],
        [ bassdrum.a, __,          closedHihat.a, __,            bass.a ],
        [ bassdrum.b, snaredrum.c, closedHihat.a, __,            bass.a ],
        [ bassdrum.a, snaredrum.a, closedHihat.a, crashCymbal.c, bass.a ],
        [ bassdrum.b, snaredrum.b, closedHihat.a, __,            bass.b ],
        [ bassdrum.a, snaredrum.a, closedHihat.a, __,            bass.c ],
        [ bassdrum.b, snaredrum.c, closedHihat.a, __,            bass.d ],
        [ bassdrum.c, __,          __,            crashCymbal.c, __ ]
        /* eslint-enable no-multi-spaces */
      ]
    });
  }
}

export { DavidGoloSong };
