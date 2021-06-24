import { Drumset } from './Drumset';
import { MidiValue } from '../../types/MidiValue';

const drumsets: Record<Drumset, MidiValue> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'TR-808': 0,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'TR-909': 1
};

export { drumsets };
