import { MultiNoteStep } from './MultiNoteStep';
import { NoteStep } from './NoteStep';
import { RestStep } from './RestStep';

type Step = MultiNoteStep | NoteStep | RestStep;

export { Step };
