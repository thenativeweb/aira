import { createNoteStep, createPattern, createPatterns, createRestStep, crescendo, NoteStep, RestStep, Step, Tr8 } from '../../../lib/aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const BD: NoteStep = createNoteStep({ ...Tr8.bassDrum(), velocity: 127 });
const bd: NoteStep = createNoteStep({ ...Tr8.bassDrum(), velocity: 40 });
const SD: NoteStep = createNoteStep({ ...Tr8.snareDrum(), velocity: 127 });
const sd: NoteStep = createNoteStep({ ...Tr8.snareDrum(), velocity: 80 });
const CH: NoteStep = createNoteStep({ ...Tr8.closedHihat(), velocity: 127 });
const ch: NoteStep = createNoteStep({ ...Tr8.closedHihat(), velocity: 40 });
const CC: NoteStep = createNoteStep({ ...Tr8.crashCymbal(), velocity: 127 });
const _: RestStep = createRestStep();

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

const a: Step = createNoteStep({ note: 'a', octave: 1, velocity: 127 });
const A: Step = createNoteStep({ note: 'a', octave: 2, velocity: 127 });
const d: Step = createNoteStep({ note: 'd', octave: 1, velocity: 127 });
const D: Step = createNoteStep({ note: 'd', octave: 2, velocity: 127 });
const e: Step = createNoteStep({ note: 'e', octave: 1, velocity: 127 });
const E: Step = createNoteStep({ note: 'e', octave: 2, velocity: 127 });
const f: Step = createNoteStep({ note: 'f', octave: 1, velocity: 127 });
const F: Step = createNoteStep({ note: 'f', octave: 2, velocity: 127 });

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
