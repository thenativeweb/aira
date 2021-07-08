import { getNoteValue } from '../utils/getNoteValue';
import { MidiChannel } from '../types/MidiChannel';
import { MidiValue } from '../types/MidiValue';
import { Note } from '../types/Note';
import { Octave } from '../types/Octave';
import { Channel, Output } from 'easymidi';

abstract class Instrument {
  protected readonly port: Output;

  protected readonly channel: Channel;

  public constructor ({ port, channel }: {
    port: string;
    channel: MidiChannel;
  }) {
    this.port = new Output(port, false);
    this.channel = channel - 1 as Channel;
  }

  protected setContinuousController ({ controller, value }: {
    controller: number;
    value: MidiValue;
  }): void {
    this.port.send('cc', {
      channel: this.channel,
      controller,
      value
    });
  }

  protected selectSound ({ value }: {
    value: MidiValue;
  }): void {
    this.port.send('program', {
      channel: this.channel,
      number: value
    });
  }

  public playNote ({ note, octave, velocity = 127, length }: {
    note: Note;
    octave: Octave;
    velocity?: MidiValue;
    length: number;
  }): void {
    this.port.send('noteon', {
      channel: this.channel,
      note: getNoteValue({ note, octave }),
      velocity
    });

    setTimeout((): void => {
      this.port.send('noteoff', {
        channel: this.channel,
        note: getNoteValue({ note, octave }),
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
