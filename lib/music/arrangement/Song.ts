import { Bar } from '../elements/Bar';
import { getStepIndex } from '../patterns/getStepIndex';
import { isRestStep } from '../patterns/isRestStep';
import { setTimeout } from 'timers/promises';
import { Signature } from '../elements/Signature';
import { Track } from './Track';

abstract class Song {
  private readonly loopLastBar: boolean;

  protected bpm: number;

  protected tracks: Track[];

  protected bars: Bar[];

  private signature?: Signature;

  public constructor ({ loopLastBar, bpm, tracks, bars }: {
    loopLastBar: boolean;
    bpm: number;
    tracks: Track[];
    bars: Bar[];
  }) {
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

          if (isRestStep(step)) {
            continue;
          }

          const { synthesizer } = this.tracks[trackIndex];

          synthesizer.playNote({
            noteValue: step.noteValue,
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

    for (const track of this.tracks) {
      track.synthesizer.stop();
    }

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    await setTimeout(500);
  }

  public isPlaying (): boolean {
    return Boolean(this.signature);
  }

  public addBar (bar: Bar): void {
    this.bars.push(bar);
  }
}

export { Song };
