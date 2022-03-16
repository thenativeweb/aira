import { NoteStep } from './NoteStep';

interface MultiNoteStep {
  type: 'multiNote';
  steps: NoteStep[];
}

export { MultiNoteStep };
