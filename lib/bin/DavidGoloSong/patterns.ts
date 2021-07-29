import { createPattern, createPatterns, crescendo, MidiValue, Step, Tr8 } from '../../aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const BD: Step = { type: 'beat', noteOctave: Tr8.bassDrum(), velocity: 127 as MidiValue };
const bd: Step = { type: 'beat', noteOctave: Tr8.bassDrum(), velocity: 40 as MidiValue };
const SD: Step = { type: 'beat', noteOctave: Tr8.snareDrum(), velocity: 127 as MidiValue };
const sd: Step = { type: 'beat', noteOctave: Tr8.snareDrum(), velocity: 80 as MidiValue };
const CH: Step = { type: 'beat', noteOctave: Tr8.closedHihat(), velocity: 127 as MidiValue };
const ch: Step = { type: 'beat', noteOctave: Tr8.closedHihat(), velocity: 40 as MidiValue };
const CC: Step = { type: 'beat', noteOctave: Tr8.crashCymbal(), velocity: 127 as MidiValue };
const _: Step = { type: 'none' };

const bassdrum = createPatterns({
  a: [ BD, _, _, _, BD, _, _, _, BD, _, _, _, BD, _, bd, _ ],
  b: [ BD, _, _, _, BD, _, _, _, BD, _, _, bd, BD, _, bd, bd ],
  c: [ BD, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});
const snaredrum = createPatterns({
  a: [ _, _, _, _, SD, _, _, _, _, _, _, _, SD, _, _, sd ],
  b: [ _, _, _, _, SD, _, _, _, _, sd, sd, sd, SD, _, SD, SD ],
  c: crescendo([
    SD, _, _, _, _, _, SD, _, SD, _, SD, _, SD, _, SD, _,
    SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD
  ])
});
const closedHihat = createPatterns({
  a: [ _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch ]
});
const crashCymbal = createPatterns({
  c: [ CC, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});

const a: Step = { type: 'note', noteOctave: { note: 'a', octave: 1 }, velocity: 127 as MidiValue };
const A: Step = { type: 'note', noteOctave: { note: 'a', octave: 2 }, velocity: 127 as MidiValue };
const d: Step = { type: 'note', noteOctave: { note: 'd', octave: 1 }, velocity: 127 as MidiValue };
const D: Step = { type: 'note', noteOctave: { note: 'd', octave: 2 }, velocity: 127 as MidiValue };
const e: Step = { type: 'note', noteOctave: { note: 'e', octave: 1 }, velocity: 127 as MidiValue };
const E: Step = { type: 'note', noteOctave: { note: 'e', octave: 2 }, velocity: 127 as MidiValue };
const f: Step = { type: 'note', noteOctave: { note: 'f', octave: 1 }, velocity: 127 as MidiValue };
const F: Step = { type: 'note', noteOctave: { note: 'f', octave: 2 }, velocity: 127 as MidiValue };

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});
const __ = createPattern([ _ ]);
/* eslint-enable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */

export {
  bassdrum,
  snaredrum,
  closedHihat,
  crashCymbal,
  bass,
  __
};
