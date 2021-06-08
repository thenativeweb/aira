import { Configuration } from './Configuration';
import { Instrument } from '../Instrument';
import { MidiChannel } from '../../types/MidiChannel';
import { MidiValue } from '../../types/MidiValue';
import { Note } from '../../types/Note';
import { Octave } from '../../types/Octave';

class Tb3 extends Instrument {
  public constructor ({ port, channel, configuration }: {
    port: string;
    channel: MidiChannel;
    configuration?: Configuration;
  }) {
    super({ port, channel });

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

  public playNote ({ note, octave, velocity, length }: {
    note: Note;
    octave: Octave;
    velocity?: MidiValue;
    length: number;
  }): void {
    super.playNote({ note, octave, length, velocity });
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
