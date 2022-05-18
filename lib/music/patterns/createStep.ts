import { ControllerStep } from './ControllerStep';
import { NoteStep } from './NoteStep';
import { Step } from './Step';

const createStep =
  (noteSteps: NoteStep | NoteStep[] = [], controllerSteps: ControllerStep | ControllerStep[] = []): Step => {
    const noteStepsArray = Array.isArray(noteSteps) ? noteSteps : [ noteSteps ];
    const controllerStepsArray = Array.isArray(controllerSteps) ? controllerSteps : [ controllerSteps ];

    return new Step(noteStepsArray, controllerStepsArray);
  };

export { createStep };
