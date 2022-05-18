import { CommonNoteName } from './CommonNoteName';
import { NoteName } from './NoteName';
import { Octave } from './Octave';

type AnyNoteName = NoteName | CommonNoteName;

type AnyNoteNameWithOctave = `${AnyNoteName}${Octave}` | `${AnyNoteName}_${Octave}`;

export { AnyNoteName, AnyNoteNameWithOctave };
