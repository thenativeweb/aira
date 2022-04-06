import { MidiValue } from '../../midi/MidiValue';
import { Percent } from '../../math/Percent';

type Controller = ({ value }: {
  value: Percent;
}) => { controller: MidiValue; value: MidiValue };

export { Controller };
