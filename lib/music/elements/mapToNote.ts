import { createNote } from './createNote';
import { Duration } from './Duration';
import { MidiValue } from './../../midi/MidiValue';
import { Note } from './Note';
import { Octave } from './Octave';
import { AnyNoteName, AnyNoteNameWithOctave } from './AnyNoteName';
import { CommonNoteDesignator, CommonNoteName } from './CommonNoteName';
import { NoteDesignator, NoteName } from './NoteName';

// Enables specifying notes and note-steps as implicitly or explicitly as desired
type NoteMappable =
  Note |
  NoteName |
  CommonNoteName |
  [AnyNoteName] |
  [AnyNoteName, Octave] |
  { name: AnyNoteName; octave?: Octave } |
  `${AnyNoteNameWithOctave}`;

const mapToNote = (val: NoteMappable): Note => {
  if (val instanceof Note) {
    return val;
  }

  if (typeof val === 'string' && ((val in NoteDesignator) || (val in CommonNoteDesignator))) {
    return createNote(val as AnyNoteName);
  }

  if (typeof val === 'string') {
    const indexOfOctave = /-?\d/u.exec(val)?.index ?? 0;
    const hasUnderscore = val.charAt(indexOfOctave - 1) === '_';
    const [ namePart, octavePart ] = [
      hasUnderscore ? val.slice(0, indexOfOctave - 1) : val.slice(0, indexOfOctave),
      Number.parseInt(val.slice(indexOfOctave), 10)
    ];

    return createNote(namePart as AnyNoteName, octavePart as Octave);
  }

  if ('name' in (val as object)) {
    const valObj = val as { name: AnyNoteName; octave?: Octave; velocity?: MidiValue; duration?: Duration };

    return createNote(valObj.name, valObj.octave ?? Note.DefaultOctave);
  }

  const valArr =
    val as [AnyNoteName] | [AnyNoteName, Octave];

  return createNote(valArr[0], valArr[1] ?? Note.DefaultOctave);
};

export { mapToNote };
export { NoteMappable };
