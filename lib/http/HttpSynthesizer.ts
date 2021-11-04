import axios from 'axios';
import { PlayNoteBody } from './PlayNoteBody';
import { PlayNoteParameters } from '../midi/PlayNoteParameters';
import { StopBody } from './StopBody';
import { Synthesizer } from '../midi/Synthesizer';

class HttpSynthesizer implements Synthesizer {
  private readonly url: string;

  public constructor ({ url }: { url: string }) {
    this.url = url;
  }

  // eslint-disable-next-line class-methods-use-this
  public setController (): void {
    throw new Error('Not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  public selectSound (): void {
    throw new Error('Not implemented.');
  }

  public async playNote (playNoteParameters: PlayNoteParameters): Promise<void> {
    const data: PlayNoteBody = {
      time: Date.now(),
      playNoteParameters
    };

    await axios({
      method: 'POST',
      url: `${this.url}/play-note`,
      data
    });
  }

  public async stop (): Promise<void> {
    const data: StopBody = {
      time: Date.now()
    };

    await axios({
      method: 'POST',
      url: `${this.url}/stop`,
      data
    });
  }
}

export {
  HttpSynthesizer
};
