import { createPattern } from './createPattern';
import { Step } from './Step';

const createPatterns = function (namedSteps: Record<string, Step[]>): Record<string, Step[]> {
  const patterns: Record<string, Step[]> = {};

  for (const [ name, steps ] of Object.entries(namedSteps)) {
    patterns[name] = createPattern(steps);
  }

  return patterns;
};

export { createPatterns };
