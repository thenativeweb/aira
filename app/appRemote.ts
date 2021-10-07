import { DavidGoloSong } from './songs/DavidGoloSong';
import { RemoteSynthesizer } from 'lib/midi/RemoteSynthesizer';

const url = '';
const tr8 = new RemoteSynthesizer({ url });
const tb3 = new RemoteSynthesizer({ url });
const system8 = new RemoteSynthesizer({ url });

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
