import { ControllerDescription } from './ControllerDescription';
import { ControllerRecipe } from './ControllerRecipe';

const createControllerDescription = function ({ controller, value }: ControllerRecipe): ControllerDescription {
  return { controller, value };
};

export { createControllerDescription };
