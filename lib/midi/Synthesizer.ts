import { MidiValue } from './MidiValue';
import { StrikeNoteParameters } from './StrikeNoteParameters';

interface Synthesizer {
  setController: ({ controller, value }: {
    controller: MidiValue;
    value: MidiValue;
  }) => void;

  selectSound: ({ value }: {
    value: MidiValue;
  }) => void;

  strikeNote: ({ noteValue, velocity }: StrikeNoteParameters) => void;

  stop: () => void;
}

export { Synthesizer };
