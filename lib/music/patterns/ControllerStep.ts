import { MidiValue } from '../../midi/MidiValue';

interface ControllerStep {
  controller: MidiValue;
  value: MidiValue;
}

export { ControllerStep };
