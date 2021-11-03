import { MidiValue } from './MidiValue';
import { PlayNoteParameters } from './PlayNoteParameters';

interface Synthesizer {
  setController: ({ controller, value }: {
    controller: MidiValue;
    value: MidiValue;
  }) => void;

  selectSound: ({ value }: {
    value: MidiValue;
  }) => void;

  playNote: ({ noteValue, velocity, length }: PlayNoteParameters) => void;

  stop: () => void;
}

export { Synthesizer };
