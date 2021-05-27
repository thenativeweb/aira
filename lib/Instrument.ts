import { getNoteValue } from './utils/getNoteValue';
import { MidiChannel } from './types/MidiChannel';
import { Note } from './types/Note';
import { Octave } from './types/Octave';
import { Output } from 'easymidi';

abstract class Instrument {
  protected readonly port: Output;

  protected readonly channel: number;

  public constructor ({ port, channel }: {
    port: string;
    channel: MidiChannel;
  }) {
    this.port = new Output(port, false);
    this.channel = channel - 1;
  }

  protected setContinuousController ({ controller, value }: {
    controller: number;
    value: number;
  }): void {
    // TODO: Figure out why the following line does not work without the cast
    //       to any, and fix it.
    this.port.send('cc', {
      channel: this.channel as any,
      controller,
      value
    });
  }

  protected selectSound ({ value }: {
    value: number;
  }): void {
    this.port.send('program', {
      // TODO: Figure out why the following line does not work without the cast
      //       to any, and fix it.
      channel: this.channel as any,
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
      // TODO: Figure out why the following line does not work without the cast
      //       to any, and fix it.
      channel: this.channel as any,
      note: getNoteValue({ name, octave }),
      velocity
    });

    setTimeout((): void => {
      this.port.send('noteoff', {
        // TODO: Figure out why the following line does not work without the cast
        //       to any, and fix it.
        channel: this.channel as any,
        note: getNoteValue({ name, octave }),
        velocity
      });
    }, length);
  }

  public stop (): void {
    for (let noteValue = 0; noteValue <= 127; noteValue++) {
      this.port.send('noteoff', {
        // TODO: Figure out why the following line does not work without the cast
        //       to any, and fix it.
        channel: this.channel as any,
        note: noteValue,
        velocity: 127
      });
    }
  }
}

export { Instrument };
