import { __, bd, bs, cc, ch, sd } from './patterns';
import { Score, Song } from '../../../lib/aira';

const welcome2022: Song = {
  cover: {
    title: 'Welcome 2022'
  },

  score ({ synthesizers: { tr8, tb3 }}): Score {
    /* eslint-disable key-spacing, no-multi-spaces */
    return {
      bpm: 137,

      tracks: {
        bassDrum:    { synthesizer: tr8 },
        snareDrum:   { synthesizer: tr8 },
        closedHiHat: { synthesizer: tr8 },
        crashCymbal: { synthesizer: tr8, mute: false },
        bassLine:    { synthesizer: tb3 }
      },

      bars: [
        // Intro
        [ bd.a, __,   ch.a, cc.c, bs.a ],
        [ bd.b, __,   ch.a, __,   bs.a ],
        [ bd.a, __,   ch.a, __,   bs.a ],
        [ bd.b, sd.c, ch.a, __,   bs.a ],

        // Build-Up
        [ bd.a, sd.a, ch.a, cc.c, bs.a ],
        [ bd.b, sd.b, ch.a, __,   bs.b ],
        [ bd.a, sd.a, ch.a, __,   bs.c ],
        [ bd.b, sd.c, ch.a, __,   bs.d ],
        [ bd.c, __,   __,   cc.c, __ ]
      ]
    };
    /* eslint-enable key-spacing, no-multi-spaces */
  }
};

export { welcome2022 };
