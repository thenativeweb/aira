import { Note } from '../types/Note';
import { Octave } from '../types/Octave';

const getNoteValue = function ({ name, octave }: {
  name: Note;
  octave: Octave;
}): number {
  const base = (octave + 1) * 12;
  const value = base + name;

  return value;
};

export { getNoteValue };
