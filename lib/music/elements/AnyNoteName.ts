import { NoteName } from "./NoteName";
import { CommonNoteName } from './CommonNoteName';
import { Octave } from './Octave';

type AnyNoteName = NoteName | CommonNoteName;

type AnyNoteNameWithOctave = `${AnyNoteName}${Octave}` | `${AnyNoteName}_${Octave}`;

export { AnyNoteName, AnyNoteNameWithOctave };