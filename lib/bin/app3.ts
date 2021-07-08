import { createPattern } from '../createPattern';
import { createPatterns } from '../createPatterns';
import { getStepIndex } from '../getStepIndex';
import { Note } from '../types/Note';
import { Octave } from '../types/Octave';
import { Step } from '../Step';
import { MidiValue, Signature, System8, Tb3, Tr8 } from '../aira';

/* eslint-disable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
const tr8 = new Tr8({
  port: 'MX-1 USB1',
  channel: 10,
  configuration: {
    drumset: 'TR-909',
    snareDrum: {
      snappiness: 40
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

tr8.stop();
tb3.stop();
system8.stop();

const tr8BassDrum = function (): {
  note: Note;
  octave: Octave;
} {
  return { note: 'c', octave: 2 };
};

const tr8SnareDrum = function (): {
  note: Note;
  octave: Octave;
} {
  return { note: 'd', octave: 2 };
};

const tr8ClosedHihat = function (): {
  note: Note;
  octave: Octave;
} {
  return { note: 'f#', octave: 2 };
};

const tr8CrashCymbal = function (): {
  note: Note;
  octave: Octave;
} {
  return { note: 'c#', octave: 3 };
};

const crescendo = function <TStep> (steps: TStep[]): TStep[] {
  const increasePerStep = Math.floor(127 / steps.length);

  return steps.map((step, index): TStep => ({
    ...step,
    velocity: increasePerStep * (index + 1)
  }));
};

const BD: Step = { type: 'beat', noteOctave: tr8BassDrum(), velocity: 127 as MidiValue };
const bd: Step = { type: 'beat', noteOctave: tr8BassDrum(), velocity: 40 as MidiValue };
const SD: Step = { type: 'beat', noteOctave: tr8SnareDrum(), velocity: 127 as MidiValue };
const sd: Step = { type: 'beat', noteOctave: tr8SnareDrum(), velocity: 80 as MidiValue };
const CH: Step = { type: 'beat', noteOctave: tr8ClosedHihat(), velocity: 127 as MidiValue };
const ch: Step = { type: 'beat', noteOctave: tr8ClosedHihat(), velocity: 40 as MidiValue };
const CC: Step = { type: 'beat', noteOctave: tr8CrashCymbal(), velocity: 127 as MidiValue };
const _: Step = { type: 'none' };

const bassdrum = createPatterns({
  a: [ BD, _, _, _, BD, _, _, _, BD, _, _, _, BD, _, bd, _ ],
  b: [ BD, _, _, _, BD, _, _, _, BD, _, _, bd, BD, _, bd, bd ],
  c: [ BD, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});
const snaredrum = createPatterns({
  a: [ _, _, _, _, SD, _, _, _, _, _, _, _, SD, _, _, sd ],
  b: [ _, _, _, _, SD, _, _, _, _, sd, sd, sd, SD, _, SD, SD ],
  c: crescendo([
    SD, _, _, _, _, _, SD, _, SD, _, SD, _, SD, _, SD, _,
    SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD
  ])
});
const closedHihat = createPatterns({
  a: [ _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch ]
});
const crashCymbal = createPatterns({
  c: [ CC, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});

const a: Step = { type: 'note', noteOctave: { note: 'a', octave: 1 }, velocity: 127 as MidiValue };
const A: Step = { type: 'note', noteOctave: { note: 'a', octave: 2 }, velocity: 127 as MidiValue };
const d: Step = { type: 'note', noteOctave: { note: 'd', octave: 1 }, velocity: 127 as MidiValue };
const D: Step = { type: 'note', noteOctave: { note: 'd', octave: 2 }, velocity: 127 as MidiValue };
const e: Step = { type: 'note', noteOctave: { note: 'e', octave: 1 }, velocity: 127 as MidiValue };
const E: Step = { type: 'note', noteOctave: { note: 'e', octave: 2 }, velocity: 127 as MidiValue };
const f: Step = { type: 'note', noteOctave: { note: 'f', octave: 1 }, velocity: 127 as MidiValue };
const F: Step = { type: 'note', noteOctave: { note: 'f', octave: 2 }, velocity: 127 as MidiValue };

const bass = createPatterns({
  a: [ _, a, A, a, _, A, a, A, _, a, A, a, _, A, a, A ],
  b: [ _, d, D, d, _, D, d, D, _, d, D, d, _, D, d, D ],
  c: [ _, e, E, e, _, E, e, E, _, e, E, e, _, E, e, E ],
  d: [ _, f, F, f, _, F, f, F, _, f, F, f, _, F, f, F ]
});
const __ = createPattern([ _ ]);

const song = {
  tracks: [
    { name: 'Bassdrum', instrument: tr8 },
    { name: 'Snaredrum', instrument: tr8 },
    { name: 'Closed Hihat', instrument: tr8 },
    { name: 'Crash Cymbal', instrument: tr8 },
    { name: 'Bass Sawwave', instrument: tb3 }
  ],

  patterns: [
    [ bassdrum.a, __, closedHihat.a, crashCymbal.c, bass.a ],
    [ bassdrum.b, __, closedHihat.a, __, bass.a ],
    [ bassdrum.a, __, closedHihat.a, __, bass.a ],
    [ bassdrum.b, snaredrum.c, closedHihat.a, __, bass.a ],
    [ bassdrum.a, snaredrum.a, closedHihat.a, crashCymbal.c, bass.a ],
    [ bassdrum.b, snaredrum.b, closedHihat.a, __, bass.b ],
    [ bassdrum.a, snaredrum.a, closedHihat.a, __, bass.c ],
    [ bassdrum.b, snaredrum.c, closedHihat.a, __, bass.d ],
    [ bassdrum.c, __, __, crashCymbal.c, __ ]
  ]
};

let songPointer = -1;

setTimeout((): void => {
  const signature = new Signature({
    bpm: 137,
    onBar (): void {
      songPointer += 1;
    },
    onCount ({ beatCounter, pulseCounter }): void {
      const stepIndex = getStepIndex({ beatCounter, pulseCounter });

      const patterns = song.patterns[songPointer];

      for (const [ trackIndex, pattern ] of patterns.entries()) {
        const step = pattern[stepIndex];

        if (step.type !== 'beat' && step.type !== 'note') {
          continue;
        }

        const { instrument } = song.tracks[trackIndex];

        instrument.playNote({
          note: step.noteOctave.note,
          octave: step.noteOctave.octave,
          velocity: step.velocity,
          length: 100
        });
      }

      if (
        song.patterns.length === songPointer + 1 &&
        beatCounter === 4 &&
        pulseCounter === 24
      ) {
        signature.stop();
      }
    }
  });

  signature.start();
}, 500);
/* eslint-enable id-length, no-underscore-dangle, @typescript-eslint/naming-convention */
