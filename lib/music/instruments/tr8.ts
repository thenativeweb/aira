import { createController } from './createController';
import { mapToNote } from './../elements/mapToNote';
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

  bassDrum: mapToNote('c2'),
  bassDrumTune: createController({ id: 20 }),
  bassDrumAttack: createController({ id: 21 }),
  bassDrumDecay: createController({ id: 23 }),
  bassDrumCompressor: createController({ id: 22 }),

  snareDrum: mapToNote('d2'),
  snareDrumTune: createController({ id: 25 }),
  snareDrumSnappiness: createController({ id: 26 }),
  snareDrumDecay: createController({ id: 28 }),
  snareDrumCompressor: createController({ id: 27 }),

  lowTom: mapToNote('g2'),
  lowTomTune: createController({ id: 46 }),
  lowTomDecay: createController({ id: 47 }),

  midTom: mapToNote('b2'),
  midTomTune: createController({ id: 49 }),
  midTomDecay: createController({ id: 50 }),

  highTom: mapToNote('d3'),
  highTomTune: createController({ id: 52 }),
  highTomDecay: createController({ id: 53 }),

  rimShot: mapToNote('c#2'),
  rimShotTune: createController({ id: 55 }),
  rimShotDecay: createController({ id: 56 }),

  handClap: mapToNote('d#2'),
  handClapTune: createController({ id: 58 }),
  handClapDecay: createController({ id: 59 }),

  closedHihat: mapToNote('f#2'),
  closedHihatTune: createController({ id: 61 }),
  closedHihatDecay: createController({ id: 62 }),

  openHihat: mapToNote('a#2'),
  openHihatTune: createController({ id: 80 }),
  openHihatDecay: createController({ id: 81 }),

  crashCymbal: mapToNote('c#3'),
  crashCymbalTune: createController({ id: 83 }),
  crashCymbalDecay: createController({ id: 84 }),

  rideCymbal: mapToNote('d#3'),
  rideCymbalTune: createController({ id: 89 }),
  rideCymbalDecay: createController({ id: 87 })
};

export { tr8 };
