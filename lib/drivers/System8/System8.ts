import { Configuration } from './Configuration';
import { Instrument } from '../Instrument';
import { MidiChannel } from '../../types/MidiChannel';
import { MidiValue } from '../../types/MidiValue';
import { Note } from '../../types/Note';
import { Octave } from '../../types/Octave';

class System8 extends Instrument {
  public constructor ({ port, channel, configuration }: {
    port: string;
    channel: MidiChannel;
    configuration?: Configuration;
  }) {
    super({ port, channel });

    if (configuration?.sound) {
      this.selectSound({ value: configuration.sound });
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
}

export { System8 };
