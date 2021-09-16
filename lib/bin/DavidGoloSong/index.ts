import { Connections } from './Connections';
import { getInstruments } from './getInstruments';
import { Song } from '../../aira';
import {
  __,
  bass,
  bassdrum,
  closedHihat,
  crashCymbal,
  snaredrum
} from './patterns';

class DavidGoloSong extends Song {
  public constructor ({ connections }: {
    connections: Connections;
  }) {
    const { tr8, tb3, system8 } = getInstruments({ connections });

    super({
      instruments: [ tr8, tb3, system8 ],
      loopLastBar: true,
      bpm: 137,
      tracks: [
        { name: 'Bassdrum', instrument: tr8 },
        { name: 'Snaredrum', instrument: tr8 },
        { name: 'Closed Hihat', instrument: tr8 },
        { name: 'Crash Cymbal', instrument: tr8 },
        { name: 'Bass Sawwave', instrument: tb3 }
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
