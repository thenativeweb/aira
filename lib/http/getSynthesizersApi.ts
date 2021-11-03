import { Synthesizer } from '../midi/Synthesizer';
import express, { Application } from 'express';

const getSynthesizersApi = function ({ synthesizers }: {
  synthesizers: Record<string, Synthesizer>;
}): Application {
  const api = express();

  api.use(express.json());

  for (const [ name, synthesizer ] of Object.entries(synthesizers)) {
    const synthesizerApi = express();

    synthesizerApi.post('/play-note', (req, res): void => {
      res.status(204).end();
      const { noteValue, velocity, length } = req.body;

      synthesizer.playNote({ noteValue, velocity, length });
    });

    synthesizerApi.post('/stop', (req, res): void => {
      res.status(204).end();
      synthesizer.stop();
    });

    api.use(`/${name}`, synthesizerApi);
  }

  return api;
};

export { getSynthesizersApi };
