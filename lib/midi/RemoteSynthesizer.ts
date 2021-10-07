import axios from 'axios';
import { MidiValue } from './MidiValue';
import { Synthesizer } from './Synthesizer';

class RemoteSynthesizer implements Synthesizer {
  protected readonly url: string;

  public constructor ({ url }: {
    url: string;
  }) {
    this.url = url;
  }

  // eslint-disable-next-line class-methods-use-this
  public setController (): void {
    throw new Error('not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  public selectSound (): void {
    throw new Error('not implemented');
  }

  public playNote ({ noteValue, velocity = 127, length }: {
    noteValue: MidiValue;
    velocity?: MidiValue;
    length: number;
  }): void {
    axios({
      url: `${this.url}/play-note`,
      data: {
        noteValue,
        velocity,
        length
      }
    }).catch((ex): void => {
      // eslint-disable-next-line no-console
      console.error('Error on play-note request', ex);
    });
  }

  public stop (): void {
    axios({
      url: `${this.url}/stop`
    }).catch((ex): void => {
      // eslint-disable-next-line no-console
      console.error('Error on stop request:', ex);
    });
  }
}

export { RemoteSynthesizer };
