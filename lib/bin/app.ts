import { getNoteLengths, Note, System8, Tb3, Tr8 } from '../aira';

const noteLengths = getNoteLengths({ bpm: 137 });

const tr8 = new Tr8({
  port: 'MX-1 USB1',
  channel: 10,
  configuration: {
    drumSet: 'tr909',
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

let cutoffAndResonance = 0;

setInterval((): void => {
  tr8.bassDrum({ length: noteLengths.sixteenth });
}, noteLengths.quarter);

setInterval((): void => {
  tr8.snareDrum({ length: noteLengths.sixteenth });
}, noteLengths.half);

setTimeout((): void => {
  setInterval((): void => {
    tr8.closedHighHat({ length: noteLengths.sixteenth });
  }, noteLengths.quarter);
}, noteLengths.eigth);

setInterval((): void => {
  setTimeout((): void => {
    tb3.playNote({ name: Note.a, octave: 1, length: noteLengths.sixteenth, velocity: 127 });

    cutoffAndResonance = (cutoffAndResonance + 1) % 128;
    tb3.setCutoff({ value: cutoffAndResonance });
    tb3.setResonance({ value: cutoffAndResonance });

    setTimeout((): void => {
      tb3.playNote({ name: Note.a, octave: 2, length: noteLengths.sixteenth, velocity: 127 });

      cutoffAndResonance = (cutoffAndResonance + 1) % 128;
      tb3.setCutoff({ value: cutoffAndResonance });
      tb3.setResonance({ value: cutoffAndResonance });

      setTimeout((): void => {
        tb3.playNote({ name: Note.a, octave: 1, length: noteLengths.sixteenth, velocity: 127 });

        cutoffAndResonance = (cutoffAndResonance + 1) % 128;
        tb3.setCutoff({ value: cutoffAndResonance });
        tb3.setResonance({ value: cutoffAndResonance });
      }, noteLengths.sixteenth);
    }, noteLengths.sixteenth);
  }, noteLengths.sixteenth);
}, noteLengths.quarter);

setInterval((): void => {
  system8.playNote({ name: Note.a, octave: 3, length: noteLengths.quarter * 3, velocity: 127 });
  system8.playNote({ name: Note.e, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
  system8.playNote({ name: Note.c, octave: 5, length: noteLengths.quarter * 3, velocity: 127 });
  setTimeout((): void => {
    system8.playNote({ name: Note.f, octave: 3, length: noteLengths.quarter * 3, velocity: 127 });
    system8.playNote({ name: Note.c, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
    system8.playNote({ name: Note.a, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
    setTimeout((): void => {
      system8.playNote({ name: Note.e, octave: 3, length: noteLengths.quarter * 3, velocity: 127 });
      system8.playNote({ name: Note.b, octave: 3, length: noteLengths.quarter * 3, velocity: 127 });
      system8.playNote({ name: Note.g, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
      setTimeout((): void => {
        system8.playNote({ name: Note.g, octave: 3, length: noteLengths.quarter * 3, velocity: 127 });
        system8.playNote({ name: Note.d, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
        system8.playNote({ name: Note.b, octave: 4, length: noteLengths.quarter * 3, velocity: 127 });
      }, noteLengths.whole);
    }, noteLengths.whole);
  }, noteLengths.whole);
}, noteLengths.whole * 4);
