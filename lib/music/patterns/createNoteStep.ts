import { NoteStep } from './NoteStep';

type FactoryArguments = Pick<NoteStep, 'noteValue' | 'velocity' | 'durationValue'>;

const createNoteStep = function ({ noteValue, velocity, durationValue }: FactoryArguments): NoteStep {
  return {
    type: 'note',
    noteValue,
    velocity,
    durationValue
  };
};

export {
  createNoteStep
};
