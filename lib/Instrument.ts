import { getNoteValue } from './utils/getNoteValue';
import { Note } from './types/Note';
import { Octave } from './types/Octave';
import { Channel, Output } from 'easymidi';

abstract class Instrument {
  protected readonly port: Output;

  protected readonly channel: Channel;

  public constructor ({ port, channel }: {
    port: string;
    channel: Channel;
  }) {
    this.port = new Output(port, false);
    this.channel = channel;
  }

  protected setContinuousController ({ controller, value }: {
    controller: number;
    value: number;
  }): void {
    this.port.send('cc', {
      channel: this.channel,
      controller,
      value
    });
  }

  protected selectSound ({ value }: {
    value: number;
  }): void {
    this.port.send('program', {
      channel: this.channel,
      number: value
    });
  }

  protected playNote ({ name, octave, velocity = 127, length }: {
    name: Note;
    octave: Octave;
    velocity?: number;
    length: number;
  }): void {
    this.port.send('noteon', {
      channel: this.channel,
      note: getNoteValue({ name, octave }),
      velocity
    });

    setTimeout((): void => {
      this.port.send('noteoff', {
        channel: this.channel,
        note: getNoteValue({ name, octave }),
        velocity
      });
    }, length);
  }

  public stop (): void {
    for (let noteValue = 0; noteValue <= 127; noteValue++) {
      this.port.send('noteoff', {
        channel: this.channel,
        note: noteValue,
        velocity: 127
      });
    }
  }
}

export { Instrument };
