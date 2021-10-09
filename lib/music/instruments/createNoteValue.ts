import { getNoteValue } from '../../midi/getNoteValue';
import { MidiValue } from '../../midi/MidiValue';
import { Note } from '../elements/Note';
import { Octave } from '../elements/Octave';

type NoteValue = () => MidiValue;

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
