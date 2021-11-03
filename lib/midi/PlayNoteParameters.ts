import { MidiValue } from './MidiValue';

interface PlayNoteParameters {
  noteValue: MidiValue;
  velocity?: MidiValue;
  length: number;
}

export {
  PlayNoteParameters
};
