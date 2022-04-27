import { welcome2022 } from './songs/welcome2022';
import { createPlayer, LocalSynthesizer } from '../lib/aira';

const tr8 = new LocalSynthesizer({ connection: { port: 'MX-1 USB1', channel: 10 }});
const tb3 = new LocalSynthesizer({ connection: { port: 'MX-1 USB3', channel: 2 }});
const system1 = new LocalSynthesizer({ connection: { port: 'MX-1 USB2', channel: 1 }});

const player = createPlayer({
  song: welcome2022,
  synthesizers: { tr8, tb3, system1 }
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const stop = await player.play();

  process.on('SIGINT', async (): Promise<void> => {
    await stop();
    process.exit(0);
  });
})();
