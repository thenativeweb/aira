import { __, bd, bs, cc, cd, ch, sd } from './patterns';
import { Score, Song } from '../../../lib/aira';

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
        snareDrum:       { synthesizer: tr8, mute: true },
        closedHiHat:     { synthesizer: tr8, mute: true },
        crashCymbal:     { synthesizer: tr8, mute: true },
        bassLine:        { synthesizer: tb3 },
        cinematicChords: { synthesizer: system1, mute: true }
      },

      bars: [
        // Intro
        [ bd.a, __,   ch.a, cc.c, bs.a, cd.a ],
        [ bd.b, __,   ch.a, __,   bs.a, cd.a ],
        [ bd.a, __,   ch.a, __,   bs.a, cd.a ],
        [ bd.b, sd.c, ch.a, __,   bs.a, cd.a ],

        // Build-Up
        [ bd.a, sd.a, ch.a, cc.c, bs.a, cd.a ],
        [ bd.b, sd.b, ch.a, __,   bs.b, cd.b ],
        [ bd.a, sd.a, ch.a, __,   bs.c, cd.c ],
        [ bd.b, sd.c, ch.a, __,   bs.d, cd.d ],
        [ bd.c, __,   __,   cc.c, __,   __   ]
      ]
    };
    /* eslint-enable key-spacing, no-multi-spaces */
  }
};

export { welcome2022 };
