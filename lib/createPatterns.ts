import { createPattern } from './createPattern';
import { Pattern } from './types/Pattern';
import { Step } from './Step';

const createPatterns = function (namedSteps: Record<string, Step[]>): Record<string, Pattern> {
  const patterns: Record<string, Step[]> = {};

  for (const [ name, steps ] of Object.entries(namedSteps)) {
    patterns[name] = createPattern(steps);
  }

  return patterns;
};

export { createPatterns };
