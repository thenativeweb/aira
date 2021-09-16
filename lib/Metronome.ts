import { PulseCounter } from './PulseCounter';

type OnPulse = ({ pulseCounter }: {
  pulseCounter: PulseCounter;
}) => void;

class Metronome {
  public readonly pulsesPerBeat = 24;

  public readonly bpm: number;

  private readonly onPulse: OnPulse;

  public readonly millisecondsPerPulse: number;

  private intervalId: NodeJS.Timeout | undefined;

  public constructor ({ bpm, onPulse }: {
    bpm: number;
    onPulse: OnPulse;
  }) {
    this.bpm = bpm;
    this.onPulse = onPulse;

    this.millisecondsPerPulse = 60_000 / bpm / this.pulsesPerBeat;
  }

  public start (): void {
    if (this.intervalId !== undefined) {
      return;
    }

    let pulseCounter: PulseCounter = 1;

    this.intervalId = setInterval((): void => {
      this.onPulse({ pulseCounter });

      pulseCounter += 1;

      if (pulseCounter > this.pulsesPerBeat) {
        pulseCounter = 1;
      }
    }, this.millisecondsPerPulse);
  }

  public stop (): void {
    if (this.intervalId === undefined) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}

export { Metronome };
