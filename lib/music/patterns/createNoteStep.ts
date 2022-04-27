import { NoteStep } from './NoteStep';

const createNoteStep = function ({ note, velocity, duration }: NoteStep): NoteStep {
  return { note, velocity, duration };
};

export { createNoteStep };
