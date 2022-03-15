import { MidiConnection } from './MidiConnection';
import { MidiValue } from './MidiValue';
import { PlayNoteParameters } from './PlayNoteParameters';
import { Synthesizer } from './Synthesizer';
import { Channel, Output } from 'easymidi';

class LocalSynthesizer implements Synthesizer {
  protected readonly port: Output;

  protected readonly channel: Channel;

  public constructor ({ connection }: {
    connection: MidiConnection;
  }) {
    this.port = new Output(connection.port, false);
    this.channel = connection.channel - 1 as Channel;
  }

  public setController ({ controller, value }: {
    controller: MidiValue;
    value: MidiValue;
  }): void {
    this.port.send('cc', {
      channel: this.channel,
      controller,
      value
    });
  }

  public selectSound ({ value }: {
    value: MidiValue;
  }): void {
    this.port.send('program', {
      channel: this.channel,
      number: value
    });
  }

  public playNote ({ noteValue, velocity = 127, duration }: PlayNoteParameters): void {
    this.port.send('noteon', {
      channel: this.channel,
      note: noteValue,
      velocity
    });

    setTimeout((): void => {
      this.port.send('noteoff', {
        channel: this.channel,
        note: noteValue,
        velocity: 127
      });
    }, duration);
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

export { LocalSynthesizer };
