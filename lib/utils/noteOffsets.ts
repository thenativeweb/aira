import { Note } from '../types/Note';

/* eslint-disable id-length, object-property-newline */
const noteOffsets: Record<Note, number> = {
  c: 0, 'c#': 1,
  d: 2, 'd#': 3,
  e: 4,
  f: 5, 'f#': 6,
  g: 7, 'g#': 8,
  a: 9, 'a#': 10,
  b: 11
};
/* eslint-enable id-length, object-property-newline */

export { noteOffsets };
