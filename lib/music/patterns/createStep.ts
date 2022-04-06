import { createControllerStep } from './createControllerStep';
import { createNoteStep } from './createNoteStep';
import { Step } from './Step';
import { ControllerDescription, isControllerDescription } from '../elements/ControllerDescription';
import { isNoteDescription, NoteDescription } from '../elements/NoteDescription';
import * as errors from '../../errors';

const createStep = function (values: (NoteDescription | ControllerDescription)[]): Step {
  const step: Step = {
    notes: [],
    controllers: []
  };

  for (const value of values) {
    if (isNoteDescription(value)) {
      step.notes.push(createNoteStep(value));
    } else if (isControllerDescription(value)) {
      step.controllers.push(createControllerStep(value));
    } else {
      throw new errors.OperationInvalid();
    }
  }

  return step;
};

export { createStep };
