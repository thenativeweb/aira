import { Duration } from '../elements/Duration';
import { MidiValue } from '../../midi/MidiValue';

interface NoteStep {
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
}

export { NoteStep };
