import { createNoteStep, createPattern, createPatterns, createRestStep, crescendo, getNoteValue, NoteStep, RestStep, Step, tr8 } from '../../../lib/aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const BD: NoteStep = createNoteStep({ noteValue: tr8.bassDrum(), velocity: 127, duration: '1/16' });
const bd: NoteStep = createNoteStep({ noteValue: tr8.bassDrum(), velocity: 40, duration: '1/16' });
const SD: NoteStep = createNoteStep({ noteValue: tr8.snareDrum(), velocity: 127, duration: '1/16' });
const sd: NoteStep = createNoteStep({ noteValue: tr8.snareDrum(), velocity: 80, duration: '1/16' });
const CH: NoteStep = createNoteStep({ noteValue: tr8.closedHihat(), velocity: 127, duration: '1/16' });
const ch: NoteStep = createNoteStep({ noteValue: tr8.closedHihat(), velocity: 40, duration: '1/16' });
const CC: NoteStep = createNoteStep({ noteValue: tr8.crashCymbal(), velocity: 127, duration: '1/16' });
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

const a: Step = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 1 }), velocity: 127, duration: '1/16' });
const A: Step = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 2 }), velocity: 127, duration: '1/16' });
const d: Step = createNoteStep({ noteValue: getNoteValue({ note: 'd', octave: 1 }), velocity: 127, duration: '1/16' });
const D: Step = createNoteStep({ noteValue: getNoteValue({ note: 'd', octave: 2 }), velocity: 127, duration: '1/16' });
const e: Step = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 1 }), velocity: 127, duration: '1/16' });
const E: Step = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 2 }), velocity: 127, duration: '1/16' });
const f: Step = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 1 }), velocity: 127, duration: '1/16' });
const F: Step = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 2 }), velocity: 127, duration: '1/16' });

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});
const __ = createPattern([ _ ]);
/* eslint-enable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */

export {
  bassdrum as bd,
  snaredrum as sd,
  closedHihat as ch,
  crashCymbal as cc,
  bass as bs,
  __
};
