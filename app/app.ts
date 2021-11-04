import { DavidGoloSong } from './songs/DavidGoloSong';
import { HttpSynthesizer } from '../lib/http/HttpSynthesizer';
import { processenv } from 'processenv';

const remoteUrl = processenv('REMOTE_URL', 'http://localhost:3000');

const tr8 = new HttpSynthesizer({ url: `${remoteUrl}/tr8` });
const tb3 = new HttpSynthesizer({ url: `${remoteUrl}/tb3` });
const system8 = new HttpSynthesizer({ url: `${remoteUrl}/system8` });

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
