import { NoteStep } from './NoteStep';

type FactoryArguments = Pick<NoteStep, 'note' | 'octave' | 'velocity'>;

const createNoteStep = function ({ note, octave, velocity }: FactoryArguments): NoteStep {
  return {
    type: 'note',
    note,
    octave,
    velocity
  };
};

export {
  createNoteStep
};
