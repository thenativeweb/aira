import { Configuration } from './Configuration';
import { Instrument } from '../Instrument';
import { MidiConnection } from '../../midi/MidiConnection';

class System8 extends Instrument {
  public constructor ({ connection, configuration }: {
    connection: MidiConnection;
    configuration?: Configuration;
  }) {
    super({ connection });

    if (configuration?.sound) {
      this.selectSound({ value: configuration.sound });
    }
  }
}

export { System8 };
