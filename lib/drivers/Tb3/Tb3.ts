import { Configuration } from './Configuration';
import { Instrument } from '../Instrument';
import { MidiChannel } from '../../types/MidiChannel';
import { Note } from '../../types/Note';
import { Octave } from '../../types/Octave';

class Tb3 extends Instrument {
  public constructor ({ port, channel, configuration }: {
    port: string;
    channel: MidiChannel;
    configuration?: Configuration;
  }) {
    super({ port, channel });

    if (configuration) {
      this.selectSound({ value: configuration.sound });
      this.setCutoff({ value: configuration.cutoff });
      this.setResonance({ value: configuration.resonance });
    }
  }

  public playNote ({ name, octave, velocity, length }: {
    name: Note;
    octave: Octave;
    velocity?: number;
    length: number;
  }): void {
    super.playNote({ name, octave, length, velocity });
  }

  public setCutoff ({ value }: {
    value: number;
  }): void {
    this.setContinuousController({ controller: 74, value });
  }

  public setResonance ({ value }: {
    value: number;
  }): void {
    this.setContinuousController({ controller: 71, value });
  }
}

export { Tb3 };
