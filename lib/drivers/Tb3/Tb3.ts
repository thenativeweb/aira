import { Configuration } from './Configuration';
import { Instrument } from '../Instrument';
import { MidiConnection } from '../../types/MidiConnection';
import { MidiValue } from '../../types/MidiValue';

class Tb3 extends Instrument {
  public constructor ({ connection, configuration }: {
    connection: MidiConnection;
    configuration?: Configuration;
  }) {
    super({ connection });

    if (configuration?.sound) {
      this.selectSound({ value: configuration.sound });
    }
    if (configuration?.cutoff) {
      this.setCutoff({ value: configuration.cutoff });
    }
    if (configuration?.resonance) {
      this.setResonance({ value: configuration.resonance });
    }
  }

  public setCutoff ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 74, value });
  }

  public setResonance ({ value }: {
    value: MidiValue;
  }): void {
    this.setContinuousController({ controller: 71, value });
  }
}

export { Tb3 };
