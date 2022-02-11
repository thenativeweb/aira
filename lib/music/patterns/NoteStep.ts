import { MidiValue } from '../../midi/MidiValue';

interface NoteStep {
  type: 'note';
  noteValue: MidiValue;
  velocity: MidiValue;
  durationValue: 1 | 0.5 | 0.25 | 0.125 | 0.0625 | 0.03125;
}

export {
  NoteStep
};
