import {
  __,
  bd,
  bs,
  cc,
  ch,
  sd
} from './patterns';
import { Score, Song } from '../../../lib/aira';

const welcome2022: Song = {
  cover: {
    title: 'Welcome 2022'
  },
  score ({ synthesizers: { tr8, tb3 }}): Score {
    const trBd = { synthesizer: tr8 };
    const trSd = { synthesizer: tr8 };
    const trCh = { synthesizer: tr8 };
    const trCc = { synthesizer: tr8 };
    const trBs = { synthesizer: tb3 };

    return {
      bpm: 137,
      tracks:
        [ trBd, trSd, trCh, trCc, trBs ],
      bars: [
        /* eslint-disable no-multi-spaces */
        [ bd.a, __,   ch.a, cc.c, bs.a ],
        [ bd.b, __,   ch.a, __,   bs.a ],
        [ bd.a, __,   ch.a, __,   bs.a ],
        [ bd.b, sd.c, ch.a, __,   bs.a ],
        [ bd.a, sd.a, ch.a, cc.c, bs.a ],
        [ bd.b, sd.b, ch.a, __,   bs.b ],
        [ bd.a, sd.a, ch.a, __,   bs.c ],
        [ bd.b, sd.c, ch.a, __,   bs.d ],
        [ bd.c, __,   __,   cc.c, __ ]
        /* eslint-enable no-multi-spaces */
      ]
    };
  }
};

export { welcome2022 };
