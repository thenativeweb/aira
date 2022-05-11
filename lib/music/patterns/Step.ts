import { ControllerStep } from './ControllerStep';
import { NoteStep } from './NoteStep';

class Step {
  public readonly noteSteps: NoteStep[];

  public readonly controllerSteps: ControllerStep[];

  public constructor (noteSteps: NoteStep[] = [], controllerSteps: ControllerStep[] = []) {
    this.noteSteps = noteSteps;
    this.controllerSteps = controllerSteps;
  }

  public withNote (noteStep: NoteStep): Step {
    return this.withNotes([ noteStep ]);
  }

  public withNotes (noteSteps: NoteStep[]): Step {
    return new Step(
      [ ...this.noteSteps, ...noteSteps ],
      [ ...this.controllerSteps ]
    );
  }

  public withController (controllerStep: ControllerStep): Step {
    return new Step(
      [ ...this.noteSteps ],
      [ ...this.controllerSteps, controllerStep ]
    );
  }
}

export { Step };
