import { PlayNoteBody } from './PlayNoteBody';
import { StopBody } from './StopBody';
import { Synthesizer } from '../midi/Synthesizer';
import express, { Application } from 'express';
import { isNil, sortBy } from 'lodash';

const getSynthesizersApi = function ({ synthesizers }: {
  synthesizers: Record<string, Synthesizer>;
}): Application {
  const api = express();

  api.use(express.json());

  let priorityQueue: {
    time: number;
    action: () => void;
  }[] = [];

  for (const [ name, synthesizer ] of Object.entries(synthesizers)) {
    const synthesizerApi = express();

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    synthesizerApi.post('/play-note', (req, res): void => {
      res.status(204).end();
      const playNoteBody = req.body as PlayNoteBody;

      priorityQueue = [
        ...priorityQueue,
        {
          time: playNoteBody.time,
          action: (): void => synthesizer.playNote(playNoteBody.playNoteParameters)
        }
      ];
      priorityQueue = sortBy(priorityQueue, (current): number => current.time);
    });

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    synthesizerApi.post('/stop', (req, res): void => {
      res.status(204).end();

      const { time } = req.body as StopBody;

      priorityQueue = [
        ...priorityQueue,
        {
          time,
          action: (): void => synthesizer.stop()
        }];
      priorityQueue = sortBy(priorityQueue, (current): number => current.time);
    });

    api.use(`/${name}`, synthesizerApi);
  }

  const checkNext = (waitTime = 2_000): void => {
    setTimeout((): void => {
      const [ current, next ] = priorityQueue;

      if (isNil(current)) {
        return checkNext();
      }

      current.action();

      if (isNil(next)) {
        return checkNext();
      }

      const currentActionTime = current.time;

      priorityQueue = priorityQueue.slice(1);

      checkNext(next.time - currentActionTime);
    }, waitTime);
  };

  checkNext();

  return api;
};

export { getSynthesizersApi };
