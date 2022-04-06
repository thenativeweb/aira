import { getNoteValue } from '../../midi/getNoteValue';
import { MidiValue } from '../../midi/MidiValue';
import { Note } from '../elements/Note';
import { NoteValue } from './NoteValue';
import { Octave } from '../elements/Octave';

const createNoteValue = function ({ note, octave }: {
  note: Note;
  octave: Octave;
}): NoteValue {
  const noteValue = getNoteValue({ note, octave });

  return function (): MidiValue {
    return noteValue;
  };
};

export { createNoteValue };
