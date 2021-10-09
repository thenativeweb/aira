import { createMidiValueFromPercent } from '../../midi/createMidiValueFromPercent';
import { MidiValue } from '../../midi/MidiValue';
import { Percent } from '../../math/Percent';

type Controller = ({ value }: {
  value: Percent;
}) => { controller: MidiValue; value: MidiValue };

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
