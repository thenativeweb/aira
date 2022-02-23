import { MidiValue } from './MidiValue';

type Milliseconds = number;

interface PlayNoteParameters {
  noteValue: MidiValue;
  velocity?: MidiValue;
  duration: Milliseconds;
}

export { PlayNoteParameters };
