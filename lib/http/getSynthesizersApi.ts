import { StopBody } from './StopBody';
import { PlayNoteBody } from './PlayNoteBody';
import { Synthesizer } from '../midi/Synthesizer';
import express, { Application } from 'express';
import { isNil, sortBy } from 'lodash';

type ActionQueue = {
  time: number;
  action: () => void;
}[];

const getSynthesizersApi = function ({ synthesizers }: {
  synthesizers: Record<string, Synthesizer>;
}): Application {
  const api = express();

  api.use(express.json());

  let actionQueue: ActionQueue = [];

  for (const [ name, synthesizer ] of Object.entries(synthesizers)) {
    const synthesizerApi = express();

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    synthesizerApi.post('/play-note', (req, res): void => {
      res.status(204).end();
      const playNoteBody = req.body as PlayNoteBody;

      actionQueue = [
        ...actionQueue,
        {
          time: playNoteBody.time,
          action: (): void => synthesizer.playNote(playNoteBody.playNoteParameters)
        }
      ];
      actionQueue = sortBy(actionQueue, (current): number => current.time);
    });

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    synthesizerApi.post('/stop', (req, res): void => {
      res.status(204).end();

      const { time } = req.body as StopBody;

      actionQueue = [
        ...actionQueue,
        {
          time,
          action: (): void => synthesizer.stop()
        }];
      actionQueue = sortBy(actionQueue, (current): number => current.time);
    });

    api.use(`/${name}`, synthesizerApi);
  }

  const checkNext = (waitTime = 250): void => {
    setTimeout((): void => {
      const current = actionQueue.shift();

      if (isNil(current)) {
        return checkNext();
      }

      current.action();

      const [ next ] = actionQueue;

      if (isNil(next)) {
        return checkNext();
      }

      checkNext(next.time - current.time);
    }, waitTime);
  };

  checkNext();

  return api;
};

export { getSynthesizersApi };
