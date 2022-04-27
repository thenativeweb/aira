import { MidiValue } from '../../midi/MidiValue';

interface ControllerRecipe {
  controller: MidiValue;
  value: MidiValue;
}

export { ControllerRecipe };
