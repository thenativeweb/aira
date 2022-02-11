import { MidiConnection } from './MidiConnection';
import { MidiValue } from './MidiValue';
import { ReleaseNoteParameters } from './ReleaseNoteParameters';
import { StrikeNoteParameters } from './StrikeNoteParameters';
import { Synthesizer } from './Synthesizer';
import { Channel, Output } from 'easymidi';
import { createMidiValue } from './createMidiValue';

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

  public strikeNote ({ noteValue, velocity = 127 }: StrikeNoteParameters): void {
    this.port.send('noteon', {
      channel: this.channel,
      note: noteValue,
      velocity
    });
  }

  public releaseNote ({ noteValue, velocity = 127 }: ReleaseNoteParameters): void {
    this.port.send('noteoff', {
      channel: this.channel,
      note: noteValue,
      velocity
    });
  }

  public stop (): void {
    for (let noteValue = 0; noteValue <= 127; noteValue++) {
      this.releaseNote({ noteValue: createMidiValue(noteValue)});
    }
  }
}

export { LocalSynthesizer };
