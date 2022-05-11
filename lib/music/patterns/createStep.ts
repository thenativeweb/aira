import { Step } from './Step';
import { NoteStep } from './NoteStep';
import { ControllerStep } from './ControllerStep';

const createStep = (noteSteps: NoteStep | NoteStep[] = [], controllerSteps: ControllerStep | ControllerStep[] = []): Step => {
  const noteStepsArray = Array.isArray(noteSteps) ? noteSteps : [noteSteps];
  const controllerStepsArray = Array.isArray(controllerSteps) ? controllerSteps : [controllerSteps];
  return new Step(noteStepsArray, controllerStepsArray);
};

export { createStep };
