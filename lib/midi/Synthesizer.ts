import { MidiValue } from './MidiValue';

interface Synthesizer {
  setController: ({ controller, value }: {
    controller: MidiValue;
    value: MidiValue;
  }) => void;

  selectSound: ({ value }: {
    value: MidiValue;
  }) => void;

  playNote: ({ noteValue, velocity, length }: {
    noteValue: MidiValue;
    velocity?: MidiValue;
    length: number;
  }) => void;

  stop: () => void;
}

export { Synthesizer };
