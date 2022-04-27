import { Duration } from '../elements/Duration';
import { MidiValue } from '../../midi/MidiValue';
import { Note } from '../elements/Note';

interface NoteStep {
  note: Note;
  velocity: MidiValue;
  duration: Duration;
}

export { NoteStep };
