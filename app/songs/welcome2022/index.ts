import { bass as bs } from './bass';
import { chords as cd } from './chords';
import { bd, cc, ch, sd } from './drums';
import { createPattern, Score, Song } from '../../../lib/aira';

// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = createPattern();

const welcome2022: Song = {
  cover: {
    title: 'Welcome 2022'
  },

  score ({ synthesizers: { tr8, tb3, system1 }}): Score {
    /* eslint-disable key-spacing, no-multi-spaces */
    return {
      bpm: 137,

      tracks: {
        bassDrum:        { synthesizer: tr8 },
        snareDrum:       { synthesizer: tr8 },
        closedHiHat:     { synthesizer: tr8 },
        crashCymbal:     { synthesizer: tr8 },
        bassLine:        { synthesizer: tb3 },
        cinematicChords: { synthesizer: system1 }
      },

      bars: [
        // Intro
        [ bd.a, _,    ch.a, cc.c, bs.a, cd.Am ],
        [ bd.b, _,    ch.a, _,    bs.a, cd.Am ],
        [ bd.a, _,    ch.a, _,    bs.a, cd.Am ],
        [ bd.b, sd.c, ch.a, _,    bs.a, cd.Am ],

        // Build-Up
        [ bd.a, sd.a, ch.a, cc.c, bs.a, cd.Am ],
        [ bd.b, sd.b, ch.a, _,    bs.b, cd.Dm ],
        [ bd.a, sd.a, ch.a, _,    bs.c, cd.Em ],
        [ bd.b, sd.c, ch.a, _,    bs.d, cd.Fd ],
        [ bd.c, _,    _,    cc.c, _,    _    ]
      ]
    };
    /* eslint-enable key-spacing, no-multi-spaces */
  }
};

export { welcome2022 };
