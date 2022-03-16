import { MultiNoteStep } from './MultiNoteStep';
import { NoteStep } from './NoteStep';

const createMultiNoteStep = function (steps: NoteStep[]): MultiNoteStep {
  return {
    type: 'multiNote',
    steps
  };
};

export { createMultiNoteStep };
