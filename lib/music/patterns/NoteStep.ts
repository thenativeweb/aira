import { Duration } from '../elements/Duration';
import { MidiValue } from '../../midi/MidiValue';

interface NoteStep {
  type: 'note';
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
}

export { NoteStep };
