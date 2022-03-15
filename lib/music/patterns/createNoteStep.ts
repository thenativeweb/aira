import { NoteStep } from './NoteStep';

type FactoryArguments = Pick<NoteStep, 'noteValue' | 'velocity' | 'duration'>;

const createNoteStep = function ({ noteValue, velocity, duration }: FactoryArguments): NoteStep {
  return {
    type: 'note',
    noteValue,
    velocity,
    duration
  };
};

export { createNoteStep };
