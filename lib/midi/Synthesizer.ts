import { MidiValue } from './MidiValue';
import { ReleaseNoteParameters } from './ReleaseNoteParameters';
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

  releaseNote: ({ noteValue, velocity }: ReleaseNoteParameters) => void;

  stop: () => void;
}

export { Synthesizer };
