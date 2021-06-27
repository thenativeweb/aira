import { MidiValue } from '../types/MidiValue';
import { Signature } from '../Signature';
import { Tr8 } from '../drivers/Tr8';

const tr8 = new Tr8({
  port: 'MX-1 USB1',
  channel: 10,
  configuration: {
    drumset: 'TR-909'
  }
});

process.on('SIGINT', (): void => {
  tr8.stop();
  process.exit();
});

tr8.stop();

setTimeout((): void => {
  const signature = new Signature({
    bpm: 137,
    onBar (): void {
      tr8.crashCymbal({ velocity: 127, length: 100 });
    },
    onCount ({ noteValue }): void {
      if (noteValue.isQuarter || [ 12, 15, 16 ].includes(noteValue.asSixteenth!)) {
        tr8.bassDrum({ velocity: 127, length: 100 });
      }
      if (noteValue.asSixteenth) {
        tr8.snareDrum({ velocity: (noteValue.asSixteenth * 8) - 1 as MidiValue, length: 100 });
      }
      if (noteValue.isEigth && !noteValue.isQuarter) {
        tr8.openHihat({ velocity: 127, length: 100 });
      }
      if (noteValue.isSixteenth && !noteValue.isQuarter && !noteValue.isEigth) {
        tr8.closedHihat({ velocity: 127, length: 100 });
      }
    }
  });

  signature.start();
}, 500);
