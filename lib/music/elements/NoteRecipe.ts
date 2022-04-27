import { Duration } from './Duration';
import { MidiValue } from '../../midi/MidiValue';
import { Note } from './Note';
import { Octave } from './Octave';

type NoteRecipe = {
  note: Note;
  octave: Octave;
  velocity: MidiValue;
  duration: Duration;
} | {
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
};

export { NoteRecipe };
