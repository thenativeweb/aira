import { MidiValue } from '../../midi/MidiValue';
import { Duration } from '../elements/Duration';

interface NoteStep {
  type: 'note';
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
}

export {
  NoteStep
};
