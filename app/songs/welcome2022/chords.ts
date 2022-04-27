import { createNoteStep, createPatterns, createStep } from '../../../lib/aira';

/* eslint-disable @typescript-eslint/naming-convention */
const _ = createStep();

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
  Am: [ Am, _, _, Am, _, _, Am, _, _, Am, _, _, Am, _, Am, _ ],
  Dm: [ Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, Dm, _ ],
  Em: [ Em, _, _, Em, _, _, Em, _, _, Em, _, _, Em, _, Em, _ ],
  Fd: [ Fd, _, _, Fd, _, _, Fd, _, _, Fd, _, _, Fd, _, Fd, _ ]
});
/* eslint-enable @typescript-eslint/naming-convention */

export { chords };
