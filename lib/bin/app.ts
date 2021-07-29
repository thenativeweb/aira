import { Bar } from '../aira';
import { DavidGoloSong } from './DavidGoloSong';
import http from 'http';
import {
  __,
  bass,
  bassdrum,
  closedHihat,
  crashCymbal,
  snaredrum
} from './DavidGoloSong/patterns';

const song = new DavidGoloSong({
  connections: {
    tr8: { port: 'MX-1 USB1', channel: 10 },
    tb3: { port: 'MX-1 USB3', channel: 2 },
    system8: { port: 'MX-1 USB4', channel: 1 }
  }
});

const server = http.createServer((req, res): void => {
  res.end();

  const abc = [ 'a', 'b', 'c' ];
  const randomNumber1 = Math.floor(Math.random() * 3);
  const randomNumber2 = Math.floor(Math.random() * 3);
  const bd = bassdrum[abc[randomNumber1]];
  const sd = snaredrum[abc[randomNumber2]];

  const bar: Bar = [
    bd, sd, closedHihat.a, crashCymbal.c, bass.a
  ];

  song.addBar(bar);
});

server.listen(3_000);

process.on('SIGINT', async (): Promise<void> => {
  await song.stop();
  process.exit();
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await song.play();
})();
