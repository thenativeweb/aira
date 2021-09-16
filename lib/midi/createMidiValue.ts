import { MidiValue } from './MidiValue';
import * as errors from '../errors';

const createMidiValue = function (value: number): MidiValue {
  if (value < 0 || value > 127) {
    throw new errors.MidiValueOutOfRange();
  }

  return value as MidiValue;
};

export {
  createMidiValue
};
