import { Note } from './Note';
import { AnyNoteName, AnyNoteNameWithOctave }  from './AnyNoteName';
import { NoteName, NoteDesignator } from './NoteName';
import { CommonNoteName, CommonNoteDesignator } from './CommonNoteName';
import { Octave } from './Octave';
import { createNote } from './createNote';
import { MidiValue } from './../../midi/MidiValue';
import { Duration } from './Duration';

//Enables specifying notes and note-steps as implicitly or explicitly as desired
type NoteMappable = Note |
                    NoteName | 
                    CommonNoteName | 
                    [AnyNoteName] | 
                    [AnyNoteName, Octave] | 
                    {name: AnyNoteName, octave?: Octave} |
                    `${AnyNoteNameWithOctave}`;

const mapToNote = (val: NoteMappable): Note => {

  if (val instanceof Note) {
    return val;
  }
  
  if (typeof val === 'string' && ((val in NoteDesignator) || (val in CommonNoteDesignator))) {
    return createNote(val as AnyNoteName);
  } 
  
  if (typeof val === 'string') {
    const indexOfOctave = val.match(/-?\d/)?.index ?? 0;
    const hasUnderscore = val.charAt(indexOfOctave -1) === '_';
    const [namePart, octavePart] = [
        (hasUnderscore ? val.slice(0,indexOfOctave - 1) : val.slice(0, indexOfOctave)),
         parseInt(val.slice(indexOfOctave))
    ];
    return createNote(namePart as AnyNoteName, octavePart as Octave);
  } 
  
  if ('name' in (val as object)) {
    const valObj = val as {name: AnyNoteName, octave?: Octave, velocity?: MidiValue, duration?: Duration};
    return createNote(valObj.name, valObj.octave ?? Note.DEFAULT_OCTAVE)
  }
  
  const valArr = val as [AnyNoteName] | 
                        [AnyNoteName, Octave];
  return createNote(valArr[0], valArr[1] ?? Note.DEFAULT_OCTAVE);

}

export { NoteMappable };
export { mapToNote };