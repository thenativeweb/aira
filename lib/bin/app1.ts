import { EventEmitter } from 'events';
import { Instrument, MidiValue, System8, Tb3, Tr8 } from '../aira';
import * as errors from '../errors';

const tr8 = new Tr8({
  port: 'MX-1 USB1',
  channel: 10,
  configuration: {
    drumset: 'TR-909',
    snareDrum: {
      snappiness: 127
    }
  }
});

const tb3 = new Tb3({
  port: 'MX-1 USB2',
  channel: 2,
  configuration: {
    sound: 1,
    cutoff: 64,
    resonance: 64
  }
});

const system8 = new System8({
  port: 'MX-1 USB4',
  channel: 1,
  configuration: {
    sound: 4
  }
});

process.on('SIGINT', (): void => {
  tr8.stop();
  tb3.stop();
  system8.stop();

  process.exit();
});

interface DrumStep {
  type: 'beat' | 'none';
  velocity?: MidiValue;
}

interface NoteStep {
  type: 'note' | 'none';
  velocity?: MidiValue;
}

type Step = DrumStep | NoteStep;

type Steps8 = [
  Step, Step, Step, Step,
  Step, Step, Step, Step
];

type Steps16 = [
  Step, Step, Step, Step,
  Step, Step, Step, Step,
  Step, Step, Step, Step,
  Step, Step, Step, Step,
];

type Steps = Steps16 | Steps8;

class Pattern<TSteps extends Steps> {
  public readonly steps: TSteps;

  public constructor (steps: TSteps) {
    this.steps = steps;
  }
}

/* eslint-disable id-length, @typescript-eslint/naming-convention */
const X: Step = { type: 'beat', velocity: 127 as MidiValue };
const x: Step = { type: 'beat', velocity: 80 as MidiValue };
const _: Step = { type: 'none' };

const crescendo = function <TStep> (steps: TStep[]): TStep[] {
  const increasePerStep = Math.floor(127 / steps.length);

  return steps.map((step, index): TStep => ({
    ...step,
    velocity: increasePerStep * (index + 1)
  }));
};

const bd = {
  a: new Pattern<Steps16>([ X, _, _, _, X, _, _, _, X, _, _, _, X, _, _, _ ]),
  b: new Pattern<Steps16>([ X, _, _, _, X, _, _, _, X, _, _, _, X, _, x, _ ]),
  c: new Pattern<Steps16>(crescendo([ x, x, x, x, x, x, x, x, X, X, X, X, X, X, X, X ]) as any)
};

const ch = {
  a: new Pattern<Steps16>([ _, _, X, _, _, _, X, _, _, _, X, _, _, _, X, _ ]),
  b: new Pattern<Steps16>([ _, _, X, _, _, _, X, _, _, x, X, x, _, x, X, _ ])
};
/* eslint-enable id-length, @typescript-eslint/naming-convention */

interface Track {
  name: string;
  instrument: Instrument;
  volume: MidiValue;
  mute: boolean;
  solo: boolean;
}

class Metronome extends EventEmitter {
  public readonly msPer4th: number;

  private readonly msPer32nd: number;

  private intervalId?: NodeJS.Timeout;

  public constructor ({ bpm }: {
    bpm: number;
  }) {
    super();

    this.msPer4th = 60_000 / bpm;
    this.msPer32nd = this.msPer4th / 8;
  }

  public start (): void {
    if (this.intervalId) {
      return;
    }

    let bar = 0;
    let counter32nd = 0;

    this.intervalId = setInterval((): void => {
      if (counter32nd % 8 === 0) {
        this.emit('click', {
          bar,
          step4th: counter32nd / 8,
          step8th: counter32nd / 4,
          step16th: counter32nd / 2,
          step32nd: counter32nd
        });
      } else if (counter32nd % 4 === 0) {
        this.emit('click', {
          bar,
          step4th: undefined,
          step8th: counter32nd / 4,
          step16th: counter32nd / 2,
          step32nd: counter32nd
        });
      } else if (counter32nd % 2 === 0) {
        this.emit('click', {
          bar,
          step4th: undefined,
          step8th: undefined,
          step16th: counter32nd / 2,
          step32nd: counter32nd
        });
      } else {
        this.emit('click', {
          bar,
          step4th: undefined,
          step8th: undefined,
          step16th: undefined,
          step32nd: counter32nd
        });
      }

      counter32nd += 1;

      if (counter32nd > 31) {
        counter32nd = 0;
        bar += 1;
      }
    }, this.msPer32nd);
  }

  public stop (): void {
    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}

class Song {
  private readonly tracks: Track[];

  private readonly patterns: (Pattern<Steps>[] | undefined)[];

  private readonly metronome: Metronome;

  public constructor ({ bpm, tracks, patterns }: {
    bpm: number;
    tracks: Track[];
    patterns: (Pattern<Steps>[] | undefined)[];
  }) {
    this.tracks = tracks;
    this.patterns = patterns;
    this.metronome = new Metronome({ bpm });
  }

  public async play (): Promise<void> {
    tr8.stop();
    tb3.stop();
    system8.stop();

    await new Promise<void>((resolve): void => {
      setTimeout((): void => {
        resolve();
      }, 100);
    });

    this.metronome.on('click', ({ bar, step4th, step8th, step16th, step32nd }: {
      bar: number;
      step4th: number | undefined;
      step8th: number | undefined;
      step16th: number | undefined;
      step32nd: number;
    }): void => {
      if (step16th === undefined) {
        return;
      }

      const currentPatterns = this.patterns[bar];

      if (!currentPatterns) {
        return this.metronome.stop();
      }

      for (const [ trackIndex, pattern ] of currentPatterns.entries()) {
        const step = pattern.steps[step16th];

        if (step.type === 'none') {
          continue;
        } else if (step.type === 'beat') {
          if (trackIndex === 0) {
            (this.tracks[trackIndex].instrument as Tr8).bassDrum({
              velocity: step.velocity,
              length: (this.metronome.msPer4th / 4) * 0.9
            });
          } else {
            (this.tracks[trackIndex].instrument as Tr8).closedHihat({
              velocity: step.velocity,
              length: (this.metronome.msPer4th / 4) * 0.9
            });
          }
        } else {
          throw new errors.OperationInvalid('Invalid step type.');
        }
      }
    });

    this.metronome.start();
  }
}

const song = new Song({
  bpm: 137,

  tracks: [
    {
      name: 'Bassdrum',
      instrument: tr8,
      volume: 100,
      mute: false,
      solo: false
    },
    {
      name: 'Closed Hi-Hat',
      instrument: tr8,
      volume: 100,
      mute: false,
      solo: false
    }
  ],

  patterns: [
    // Introduction
    [ bd.a, ch.a ],
    [ bd.b, ch.b ],

    // Bridge
    [ bd.a, ch.a ],
    [ bd.c, ch.b ]
  ]
});

/* eslint-disable @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  await song.play();
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
