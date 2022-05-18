import { AnyNoteName } from './AnyNoteName';
import { CommonNoteDesignator } from './CommonNoteName';
import { Note } from './Note';
import { NoteDesignator } from './NoteName';
import { Octave } from './Octave';
import * as errors from './../../errors';

const createNote = (name: AnyNoteName, octave?: Octave): Note => {
  if (!(name in NoteDesignator) && !(name in CommonNoteDesignator)) {
    throw new errors.NoteNameInvalid();
  }
  if ((octave !== undefined) && (Number(octave) < -1 || Number(octave) > 7)) {
    throw new errors.OctaveOutOfRange();
  }

  return new Note(name, octave);
};

export { createNote };
