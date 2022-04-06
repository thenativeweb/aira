import { ControllerStep } from './ControllerStep';
import { MidiValue } from '../../midi/MidiValue';

const createControllerStep = function ({ controller, value }: {
  controller: MidiValue;
  value: MidiValue;
}): ControllerStep {
  return { controller, value };
};

export { createControllerStep };
