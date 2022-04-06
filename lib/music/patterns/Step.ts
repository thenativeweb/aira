import { ControllerStep } from './ControllerStep';
import { NoteStep } from './NoteStep';

interface Step {
  notes: NoteStep[];
  controllers: ControllerStep[];
}

export { Step };
