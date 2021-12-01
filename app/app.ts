import { createPlayer, LocalSynthesizer, Song, Synthesizer } from '../lib/aira';
import { processenv } from 'processenv';
import { welcome2022 } from './songs/welcome2022';

// const remoteUrl = processenv('REMOTE_URL', 'http://localhost:3000');
// const tr8 = new HttpSynthesizer({ url: `${remoteUrl}/tr8` });
// const tb3 = new HttpSynthesizer({ url: `${remoteUrl}/tb3` });
// const system8 = new HttpSynthesizer({ url: `${remoteUrl}/system8` });

const tr8 = new LocalSynthesizer({ connection: { port: 'MX-1 USB1', channel: 10 }});
const tb3 = new LocalSynthesizer({ connection: { port: 'MX-1 USB3', channel: 2 }});
const system8 = new LocalSynthesizer({ connection: { port: 'MX-1 USB4', channel: 1 }});

const player = createPlayer({
  song: welcome2022,
  synthesizers: { tr8, tb3 }
});

process.on('SIGINT', async (): Promise<void> => {
  await player.stop();
  process.exit();
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await player.play();
})();
