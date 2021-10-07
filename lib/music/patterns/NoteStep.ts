import { MidiValue } from '../../midi/MidiValue';

interface NoteStep {
  type: 'note';
  noteValue: MidiValue;
  velocity: MidiValue;
}

export {
  NoteStep
};
