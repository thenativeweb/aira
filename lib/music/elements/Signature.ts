import { Metronome } from './Metronome';
import { PulseCounter } from './PulseCounter';

interface NoteValue {
  isWhole: boolean;
  isHalf: boolean;
  isQuarter: boolean;
  isEigth: boolean;
  isEigthTriplet: boolean;
  isSixteenth: boolean;
  isSixteenthTriplet: boolean;
  isThirtySecond: boolean;
  isThirtySecondTriplet: boolean;

  asQuarter: number | undefined;
  asEigth: number | undefined;
  asEigthTriplet: number | undefined;
  asSixteenth: number | undefined;
  asSixteenthTriplet: number | undefined;
  asThirtySecond: number | undefined;
  asThirtySecondTriplet: number | undefined;
}

type OnBar = () => void;
type OnCount = ({ beatCounter, pulseCounter, noteValue }: {
  beatCounter: number;
  pulseCounter: PulseCounter;
  noteValue: NoteValue;
}) => void;

class Signature {
  private readonly beatsPerBar = 4;

  private readonly metronome: Metronome;

  private beatCounter: number;

  public constructor ({ bpm, onBar, onCount }: {
    bpm: number;
    onBar: OnBar;
    onCount: OnCount;
  }) {
    this.beatCounter = 1;

    this.metronome = new Metronome({
      bpm,
      onPulse: ({ pulseCounter }): void => {
        if (this.beatCounter === 1 && pulseCounter === 1) {
          onBar();
        }

        const noteValue = this.getNoteValue({ pulseCounter });

        onCount({ beatCounter: this.beatCounter, pulseCounter, noteValue });

        if (pulseCounter === this.metronome.pulsesPerBeat) {
          this.beatCounter += 1;

          if (this.beatCounter > this.beatsPerBar) {
            this.beatCounter = 1;
          }
        }
      }
    });
  }

  private getNoteValue ({ pulseCounter }: {
    pulseCounter: PulseCounter;
  }): NoteValue {
    const isWhole = [ 1 ].includes(this.beatCounter) && [ 1 ].includes(pulseCounter);
    const isHalf = [ 1, 3 ].includes(this.beatCounter) && [ 1 ].includes(pulseCounter);
    const isQuarter = [ 1 ].includes(pulseCounter);
    const isEigth = [ 1, 13 ].includes(pulseCounter);
    const isEigthTriplet = [ 1, 9, 17 ].includes(pulseCounter);
    const isSixteenth = [ 1, 7, 13, 19 ].includes(pulseCounter);
    const isSixteenthTriplet = [ 1, 5, 9, 13, 17, 21 ].includes(pulseCounter);
    const isThirtySecond = [ 1, 4, 7, 10, 13, 16, 19, 22 ].includes(pulseCounter);
    const isThirtySecondTriplet = [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 ].includes(pulseCounter);

    const asQuarter = isQuarter ? this.beatCounter : undefined;
    const asEigth = isEigth ? ((this.beatCounter - 1) * 2) + ((pulseCounter - 1) / 12) + 1 : undefined;
    const asEigthTriplet = isEigthTriplet ? ((this.beatCounter - 1) * 3) + ((pulseCounter - 1) / 8) + 1 : undefined;
    const asSixteenth = isSixteenth ? ((this.beatCounter - 1) * 4) + ((pulseCounter - 1) / 6) + 1 : undefined;
    const asSixteenthTriplet = isSixteenthTriplet ? ((this.beatCounter - 1) * 6) + ((pulseCounter - 1) / 4) + 1 : undefined;
    const asThirtySecond = isThirtySecond ? ((this.beatCounter - 1) * 8) + ((pulseCounter - 1) / 3) + 1 : undefined;
    const asThirtySecondTriplet = isThirtySecondTriplet ? ((this.beatCounter - 1) * 12) + ((pulseCounter - 1) / 2) + 1 : undefined;

    return {
      isWhole,
      isHalf,
      isQuarter,
      isEigth,
      isEigthTriplet,
      isSixteenth,
      isSixteenthTriplet,
      isThirtySecond,
      isThirtySecondTriplet,

      asQuarter,
      asEigth,
      asEigthTriplet,
      asSixteenth,
      asSixteenthTriplet,
      asThirtySecond,
      asThirtySecondTriplet
    };
  }

  public start (): void {
    this.beatCounter = 1;
    this.metronome.start();
  }

  public stop (): void {
    this.metronome.stop();
  }
}

export { Signature };
