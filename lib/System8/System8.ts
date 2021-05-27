import { Configuration } from './Configuration';
import { Channel } from 'easymidi';
import { Instrument } from '../Instrument';
import { Note } from '../types/Note';
import { Octave } from '../types/Octave';

class System8 extends Instrument {
  public constructor ({ port, channel, configuration }: {
    port: string;
    channel: Channel;
    configuration?: Configuration;
  }) {
    super({ port, channel });

    if (configuration) {
      this.selectSound({ value: configuration.sound });
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
}

export { System8 };
