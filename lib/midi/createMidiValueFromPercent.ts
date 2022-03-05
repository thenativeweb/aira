import { MidiValue } from './MidiValue';
import { Percent } from '../math/Percent';

const createMidiValueFromPercent = function (value: Percent): MidiValue {
  return Math.ceil(127 / 100 * value) as MidiValue;
};

export { createMidiValueFromPercent };
