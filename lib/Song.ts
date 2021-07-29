import { Bar } from './Bar';
import { getStepIndex } from './getStepIndex';
import { Instrument } from './drivers/Instrument';
import { promisify } from 'util';
import { Signature } from './Signature';
import { Track } from './Track';

const sleep = promisify(setTimeout);

abstract class Song {
  protected instruments: Instrument[];

  private readonly loopLastBar: boolean;

  protected bpm: number;

  protected tracks: Track[];

  protected bars: Bar[];

  private signature?: Signature;

  public constructor ({ instruments, loopLastBar, bpm, tracks, bars }: {
    instruments: Instrument[];
    loopLastBar: boolean;
    bpm: number;
    tracks: Track[];
    bars: Bar[];
  }) {
    this.instruments = instruments;
    this.loopLastBar = loopLastBar;
    this.bpm = bpm;
    this.tracks = tracks;
    this.bars = bars;
  }

  public async play (): Promise<void> {
    await this.stop();

    let barCounter = -1;

    this.signature = new Signature({
      bpm: this.bpm,

      onBar (): void {
        barCounter += 1;
      },

      onCount: ({ beatCounter, pulseCounter }): void => {
        const stepIndex = getStepIndex({ beatCounter, pulseCounter });

        const bar = this.bars[barCounter];

        for (const [ trackIndex, pattern ] of bar.entries()) {
          const step = pattern[stepIndex];

          if (step.type !== 'beat' && step.type !== 'note') {
            continue;
          }

          const { instrument } = this.tracks[trackIndex];

          instrument.playNote({
            note: step.noteOctave.note,
            octave: step.noteOctave.octave,
            velocity: step.velocity,
            length: 100
          });
        }

        if (
          this.bars.length === barCounter + 1 &&
          beatCounter === 4 &&
          pulseCounter === 24
        ) {
          if (this.loopLastBar) {
            barCounter -= 1;

            return;
          }

          this.signature?.stop();
          this.signature = undefined;
        }
      }
    });

    this.signature.start();
  }

  public async stop (): Promise<void> {
    this.signature?.stop();
    this.signature = undefined;

    for (const instrument of this.instruments) {
      instrument.stop();
    }

    await sleep(500);
  }

  public isPlaying (): boolean {
    return Boolean(this.signature);
  }

  public addBar (bar: Bar): void {
    this.bars.push(bar);
  }
}

export { Song };
