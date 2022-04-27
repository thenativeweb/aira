import { createPatterns, createStep } from '../../../lib/aira';

/* eslint-disable id-length, @typescript-eslint/naming-convention */
const _ = createStep();

const a = createStep().withNote({ note: 'a1', velocity: 127, duration: '1/16' });
const A = createStep().withNote({ note: 'a2', velocity: 127, duration: '1/16' });
const d = createStep().withNote({ note: 'd1', velocity: 127, duration: '1/16' });
const D = createStep().withNote({ note: 'd2', velocity: 127, duration: '1/16' });
const e = createStep().withNote({ note: 'e1', velocity: 127, duration: '1/16' });
const E = createStep().withNote({ note: 'e2', velocity: 127, duration: '1/16' });
const f = createStep().withNote({ note: 'f1', velocity: 127, duration: '1/16' });
const F = createStep().withNote({ note: 'f2', velocity: 127, duration: '1/16' });

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});
/* eslint-enable id-length, @typescript-eslint/naming-convention */

export { bass };
