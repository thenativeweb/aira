import { createPatterns, createStep, NoteStep, mapToNoteStep, NoteStepMappable } from '../../../lib/aira';

/* eslint-disable id-length, @typescript-eslint/naming-convention */
const _ = createStep();

const noteStepData: NoteStepMappable[] =  [
  { name: 'a', octave: 1, velocity: 127, duration: '1/16' },
  { name: 'a', octave: 2, velocity: 127, duration: '1/16' },
  { name: 'd', octave: 1, velocity: 127, duration: '1/16' },
  { name: 'd', octave: 2, velocity: 127, duration: '1/16' },
  { name: 'e', octave: 1, velocity: 127, duration: '1/16' },
  { name: 'e', octave: 2, velocity: 127, duration: '1/16' },
  { name: 'f', octave: 1, velocity: 127, duration: '1/16' },
  { name: 'f', octave: 2, velocity: 127, duration: '1/16' },
];

const [a1, a2, d1, d2, e1, e2, f1, f1] = noteStepData.map(mapToNoteStep).map(createStep);


const bass = createPatterns({
  a: [ _, a1, a2, a1, _, a2, a1, a2, _, a1, a2, a1, _, a2, a1, a2 ],
  b: [ _, d1, d2, d1, _, d2, d1, d2, _, d1, d2, d1, _, d2, d1, d2 ],
  c: [ _, e1, e2, e1, _, e2, e1, e2, _, e1, e2, e1, _, e2, e1, e2 ],
  d: [ _, f1, f2, f1, _, f2, f1, f2, _, f1, f2, f1, _, f2, f1, f2 ]
});
/* eslint-enable id-length, @typescript-eslint/naming-convention */

export { bass };
