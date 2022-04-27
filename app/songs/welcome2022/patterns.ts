import {
  createNoteStep,
  createPattern,
  createPatterns,
  createStep,
  crescendo,
  tb3,
  tr8
} from '../../../lib/aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const BD = createStep().withNote({ note: tr8.bassDrum, velocity: 127, duration: '1/16' });
const bd = createStep().withNote({ note: tr8.bassDrum, velocity: 40, duration: '1/16' });
const SD = createStep().withNote({ note: tr8.snareDrum, velocity: 127, duration: '1/16' });
const sd = createStep().withNote({ note: tr8.snareDrum, velocity: 80, duration: '1/16' });
const CH = createStep().withNote({ note: tr8.closedHihat, velocity: 127, duration: '1/16' });
const ch = createStep().withNote({ note: tr8.closedHihat, velocity: 40, duration: '1/16' });
const CC = createStep().withNote({ note: tr8.crashCymbal, velocity: 127, duration: '1/16' });
const _ = createStep();

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

const a = createStep().
  withNote({ note: 'a1', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 0 })).
  withController(tb3.resonance({ value: 0 }));
const A = createStep().
  withNote({ note: 'a2', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 0 })).
  withController(tb3.resonance({ value: 0 }));
const d = createStep().
  withNote({ note: 'd1', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 100 })).
  withController(tb3.resonance({ value: 100 }));
const D = createStep().
  withNote({ note: 'd2', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 100 })).
  withController(tb3.resonance({ value: 100 }));
const e = createStep().
  withNote({ note: 'e1', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 0 })).
  withController(tb3.resonance({ value: 0 }));
const E = createStep().
  withNote({ note: 'e2', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 0 })).
  withController(tb3.resonance({ value: 0 }));
const f = createStep().
  withNote({ note: 'f1', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 100 })).
  withController(tb3.resonance({ value: 100 }));
const F = createStep().
  withNote({ note: 'f2', velocity: 127, duration: '1/16' }).
  withController(tb3.cutoff({ value: 100 })).
  withController(tb3.resonance({ value: 100 }));

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});

const a3 = createNoteStep({ note: 'a3', velocity: 127, duration: '1/16' });
const b3 = createNoteStep({ note: 'b3', velocity: 127, duration: '1/16' });
const c4 = createNoteStep({ note: 'c4', velocity: 127, duration: '1/16' });
const e4 = createNoteStep({ note: 'e4', velocity: 127, duration: '1/16' });
const f4 = createNoteStep({ note: 'f4', velocity: 127, duration: '1/16' });
const g4 = createNoteStep({ note: 'g4', velocity: 127, duration: '1/16' });
const a4 = createNoteStep({ note: 'a4', velocity: 127, duration: '1/16' });
const c5 = createNoteStep({ note: 'c5', velocity: 127, duration: '1/16' });
const d5 = createNoteStep({ note: 'd5', velocity: 127, duration: '1/16' });
const e5 = createNoteStep({ note: 'e5', velocity: 127, duration: '1/16' });
const f5 = createNoteStep({ note: 'f5', velocity: 127, duration: '1/16' });

const Am = createStep().withNotes([ a3, e4, c5 ]);
const Dm = createStep().withNotes([ a3, f4, d5 ]);
const Em = createStep().withNotes([ b3, g4, e5 ]);
const Fd = createStep().withNotes([ c4, a4, f5 ]);

const chords = createPatterns({
  a: [ Am, _, _, Am, _, _, Am, _, _, Am, _, _, Am, _, Am, _ ],
  b: [ Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, Dm, _ ],
  c: [ Em, _, _, Em, _, _, Em, _, _, Em, _, _, Em, _, Em, _ ],
  d: [ Fd, _, _, Fd, _, _, Fd, _, _, Fd, _, _, Fd, _, Fd, _ ]
});

const __ = createPattern([ _ ]);
/* eslint-enable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */

export {
  bassdrum as bd,
  snaredrum as sd,
  chords as cd,
  closedHihat as ch,
  crashCymbal as cc,
  bass as bs,
  __
};
