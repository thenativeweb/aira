import { createMultiNoteStep, createNoteStep, createPattern, createPatterns, createRestStep, crescendo, getNoteValue, tr8 } from '../../../lib/aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const BD = createNoteStep({ noteValue: tr8.bassDrum(), velocity: 127, duration: '1/16' });
const bd = createNoteStep({ noteValue: tr8.bassDrum(), velocity: 40, duration: '1/16' });
const SD = createNoteStep({ noteValue: tr8.snareDrum(), velocity: 127, duration: '1/16' });
const sd = createNoteStep({ noteValue: tr8.snareDrum(), velocity: 80, duration: '1/16' });
const CH = createNoteStep({ noteValue: tr8.closedHihat(), velocity: 127, duration: '1/16' });
const ch = createNoteStep({ noteValue: tr8.closedHihat(), velocity: 40, duration: '1/16' });
const CC = createNoteStep({ noteValue: tr8.crashCymbal(), velocity: 127, duration: '1/16' });
const _ = createRestStep();

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

const a = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 1 }), velocity: 127, duration: '1/16' });
const A = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 2 }), velocity: 127, duration: '1/16' });
const d = createNoteStep({ noteValue: getNoteValue({ note: 'd', octave: 1 }), velocity: 127, duration: '1/16' });
const D = createNoteStep({ noteValue: getNoteValue({ note: 'd', octave: 2 }), velocity: 127, duration: '1/16' });
const e = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 1 }), velocity: 127, duration: '1/16' });
const E = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 2 }), velocity: 127, duration: '1/16' });
const f = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 1 }), velocity: 127, duration: '1/16' });
const F = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 2 }), velocity: 127, duration: '1/16' });

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});

const a3 = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 3 }), velocity: 127, duration: '1/16' });
const b3 = createNoteStep({ noteValue: getNoteValue({ note: 'b', octave: 3 }), velocity: 127, duration: '1/16' });
const c4 = createNoteStep({ noteValue: getNoteValue({ note: 'c', octave: 4 }), velocity: 127, duration: '1/16' });
const e4 = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 4 }), velocity: 127, duration: '1/16' });
const f4 = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 4 }), velocity: 127, duration: '1/16' });
const g4 = createNoteStep({ noteValue: getNoteValue({ note: 'g', octave: 4 }), velocity: 127, duration: '1/16' });
const a4 = createNoteStep({ noteValue: getNoteValue({ note: 'a', octave: 4 }), velocity: 127, duration: '1/16' });
const c5 = createNoteStep({ noteValue: getNoteValue({ note: 'c', octave: 5 }), velocity: 127, duration: '1/16' });
const d5 = createNoteStep({ noteValue: getNoteValue({ note: 'd', octave: 5 }), velocity: 127, duration: '1/16' });
const e5 = createNoteStep({ noteValue: getNoteValue({ note: 'e', octave: 5 }), velocity: 127, duration: '1/16' });
const f5 = createNoteStep({ noteValue: getNoteValue({ note: 'f', octave: 5 }), velocity: 127, duration: '1/16' });

const Am = createMultiNoteStep([ a3, e4, c5 ]);
const Dm = createMultiNoteStep([ a3, f4, d5 ]);
const Em = createMultiNoteStep([ b3, g4, e5 ]);
const Fd = createMultiNoteStep([ c4, a4, f5 ]);

// TODO
// - createPatterns, createPattern, createStep sind von außen verfügbar
// - createNote und createController werden intern genutzt, um das
//   menschenlesbare Format in ein maschinenlesbares umzuwandeln
// - createStep gibt einen Step zurück, der *immer* aus einem Array von
//   Noten- und Controller-Objekten besteht
// - RestStep entfällt, das ist einfach ein Step mit leerem Array
// - Damit entfallen (hoffentlich) alle switch-case-Statements
// - Eine Fallunterscheidung werden wir weiterhin haben: Note vs Controller
// - Crescendo-Funktion muss überarbeitet werden, so dass sie auf Noten und
//   Controller-Werten arbeiten kann
// - Patterns übersichtlicher strukturieren
// - Sounds zu Beginn konfigurieren (Program Change)

/*
const bla = { note: 'c', octave: 5, velocity: 127, duration: '1/16' };

const restStep = createStep([]);

const x = createStep([
  { note: 'c', octave: 5, velocity: 127, duration: '1/16' },
  { note: 'c', octave: 5, velocity: 127, duration: '1/16' },
  { controller: 73, value: 115 }
]);
*/

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
