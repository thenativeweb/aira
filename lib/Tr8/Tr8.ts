import { Configuration } from './Configuration';
import { flaschenpost } from 'flaschenpost';
import { Instrument } from '../Instrument';
import { MidiChannel } from '../types/MidiChannel';
import { Note } from '../types/Note';
import * as errors from '../errors';

const logger = flaschenpost.getLogger();

const drumSets = {
  tr808: 0,
  tr909: 1
};

class Tr8 extends Instrument {
  public constructor ({ port, channel, configuration }: {
    port: string;
    channel: MidiChannel;
    configuration?: Configuration;
  }) {
    super({ port, channel });

    if (configuration) {
      if (!drumSets[configuration.drumSet]) {
        throw new errors.DrumsetUnknown();
      }

      this.selectSound({ value: drumSets[configuration.drumSet] });

      this.setContinuousController({
        controller: 26,
        value: configuration.snareDrum.snappiness
      });
    }
  }

  public bassDrum ({ length, velocity }: {
    length: number;
    velocity?: number;
  }): void {
    logger.info('TR8 Bassdrum');
    this.playNote({ name: Note.c, octave: 2, length, velocity });
  }

  public snareDrum ({ length, velocity }: {
    length: number;
    velocity?: number;
  }): void {
    logger.info('TR8 Snaredrum');
    this.playNote({ name: Note.d, octave: 2, length, velocity });
  }

  public closedHighHat ({ length, velocity }: {
    length: number;
    velocity?: number;
  }): void {
    logger.info('TR8 Closed High-Hat');
    this.playNote({ name: Note.fs, octave: 2, length, velocity });
  }
}

export { Tr8 };
