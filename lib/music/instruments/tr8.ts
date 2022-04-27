import { createController } from './createController';
import { createNote } from '../elements/createNote';
import { MidiValue } from '../../midi/MidiValue';

type DrumsetName = 'tr808' | 'tr909';

const drumsets: Record<DrumsetName, MidiValue> = {
  tr808: 0,
  tr909: 1
};

const tr8 = {
  drumset (drumsetName: DrumsetName): MidiValue {
    return drumsets[drumsetName];
  },

  bassDrum: createNote({ note: 'c2' }),
  bassDrumTune: createController({ id: 20 }),
  bassDrumAttack: createController({ id: 21 }),
  bassDrumDecay: createController({ id: 23 }),
  bassDrumCompressor: createController({ id: 22 }),

  snareDrum: createNote({ note: 'd2' }),
  snareDrumTune: createController({ id: 25 }),
  snareDrumSnappiness: createController({ id: 26 }),
  snareDrumDecay: createController({ id: 28 }),
  snareDrumCompressor: createController({ id: 27 }),

  lowTom: createNote({ note: 'g2' }),
  lowTomTune: createController({ id: 46 }),
  lowTomDecay: createController({ id: 47 }),

  midTom: createNote({ note: 'b2' }),
  midTomTune: createController({ id: 49 }),
  midTomDecay: createController({ id: 50 }),

  highTom: createNote({ note: 'd3' }),
  highTomTune: createController({ id: 52 }),
  highTomDecay: createController({ id: 53 }),

  rimShot: createNote({ note: 'c#2' }),
  rimShotTune: createController({ id: 55 }),
  rimShotDecay: createController({ id: 56 }),

  handClap: createNote({ note: 'd#2' }),
  handClapTune: createController({ id: 58 }),
  handClapDecay: createController({ id: 59 }),

  closedHihat: createNote({ note: 'f#2' }),
  closedHihatTune: createController({ id: 61 }),
  closedHihatDecay: createController({ id: 62 }),

  openHihat: createNote({ note: 'a#2' }),
  openHihatTune: createController({ id: 80 }),
  openHihatDecay: createController({ id: 81 }),

  crashCymbal: createNote({ note: 'c#3' }),
  crashCymbalTune: createController({ id: 83 }),
  crashCymbalDecay: createController({ id: 84 }),

  rideCymbal: createNote({ note: 'd#3' }),
  rideCymbalTune: createController({ id: 89 }),
  rideCymbalDecay: createController({ id: 87 })
};

export { tr8 };
