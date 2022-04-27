import { ControllerStep } from './ControllerStep';
import { NoteStep } from './NoteStep';

class Step {
  public readonly notes: NoteStep[];

  public readonly controllers: ControllerStep[];

  public constructor (notes: NoteStep[] = [], controllers: ControllerStep[] = []) {
    this.notes = notes;
    this.controllers = controllers;
  }

  public withNote (noteStep: NoteStep): Step {
    return this.withNotes([ noteStep ]);
  }

  public withNotes (noteStep: NoteStep[]): Step {
    return new Step(
      [ ...this.notes, ...noteStep ],
      [ ...this.controllers ]
    );
  }

  public withController (controllerStep: ControllerStep): Step {
    return new Step(
      [ ...this.notes ],
      [ ...this.controllers, controllerStep ]
    );
  }
}

export { Step };
