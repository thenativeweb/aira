import { AnyNoteName } from './AnyNoteName';
import { NoteDesignator, NoteName } from './NoteName';
import { CommonNoteDesignator, CommonNoteName } from './CommonNoteName';
import { Octave } from './Octave';
import { Note } from './Note';
import * as errors from './../../errors';


const createNote = (name: AnyNoteName, octave?: Octave): Note => {
  if (!(name in NoteDesignator) && !(name in CommonNoteDesignator)) {
      throw new errors.NoteNameInvalid();
  }
  if ((typeof octave !== undefined) && (Number(octave) < -1 || Number(octave) > 7)) {
    throw new errors.OctaveOutOfRange();
  }
  return new Note(name, octave);
}

export { createNote };