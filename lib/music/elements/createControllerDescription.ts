import { ControllerDescription } from './ControllerDescription';
import { MidiValue } from '../../midi/MidiValue';

const createControllerDescription = function ({ controller, value }: {
  controller: MidiValue;
  value: MidiValue;
}): ControllerDescription {
  return { controller, value };
};

export { createControllerDescription };
