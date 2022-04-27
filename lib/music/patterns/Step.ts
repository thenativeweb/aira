import { ControllerRecipe } from '../elements/ControllerRecipe';
import { ControllerStep } from './ControllerStep';
import { createControllerDescription } from '../elements/createControllerDescription';
import { createNoteDescription } from '../elements/createNoteDescription';
import { NoteRecipe } from '../elements/NoteRecipe';
import { NoteStep } from './NoteStep';
import { NoteDescription } from '../elements/NoteDescription';

class Step {
  public readonly notes: NoteStep[];

  public readonly controllers: ControllerStep[];

  public constructor (notes: NoteStep[] = [], controllers: ControllerStep[] = []) {
    this.notes = notes;
    this.controllers = controllers;
  }

  public withNote (noteRecipe: NoteRecipe): Step {
    return this.withNotes([ noteRecipe ]);
  }

  public withNotes (noteRecipes: NoteRecipe[]): Step {
    return new Step(
      [ ...this.notes, ...noteRecipes.map(
        (noteRecipe): NoteDescription => createNoteDescription(noteRecipe)
      ) ],
      [ ...this.controllers ]
    );
  }

  public withController (controllerRecipe: ControllerRecipe): Step {
    return new Step(
      [ ...this.notes ],
      [ ...this.controllers, createControllerDescription(controllerRecipe) ]
    );
  }
}

export { Step };
