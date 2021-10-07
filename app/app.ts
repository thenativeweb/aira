import { DavidGoloSong } from './songs/DavidGoloSong';
import { LocalSynthesizer } from '../lib/aira';

const tr8 = new LocalSynthesizer({ connection: { port: 'MX-1 USB1', channel: 10 }});
const tb3 = new LocalSynthesizer({ connection: { port: 'MX-1 USB3', channel: 2 }});
const system8 = new LocalSynthesizer({ connection: { port: 'MX-1 USB4', channel: 1 }});

const song = new DavidGoloSong({
  synthesizers: { tr8, tb3, system8 }
});

process.on('SIGINT', async (): Promise<void> => {
  await song.stop();
  process.exit();
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await song.play();
})();
