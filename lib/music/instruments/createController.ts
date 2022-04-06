import { Controller } from './Controller';
import { createMidiValueFromPercent } from '../../midi/createMidiValueFromPercent';
import { MidiValue } from '../../midi/MidiValue';
import { Percent } from '../../math/Percent';

const createController = function ({ id }: {
  id: MidiValue;
}): Controller {
  return function ({ value }: {
    value: Percent;
  }): { controller: MidiValue; value: MidiValue } {
    return { controller: id, value: createMidiValueFromPercent(value) };
  };
};

export { createController };
