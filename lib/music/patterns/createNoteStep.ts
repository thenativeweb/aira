import { NoteStep } from './NoteStep';

type FactoryArguments = Pick<NoteStep, 'noteValue' | 'velocity'>;

const createNoteStep = function ({ noteValue, velocity }: FactoryArguments): NoteStep {
  return {
    type: 'note',
    noteValue,
    velocity
  };
};

export {
  createNoteStep
};
