import { createPosition } from './createPosition';
import { Position } from './Position';
import { Signature } from './Signature';

const createSignature = function ({ ppqn }: {
  ppqn: number;
}): Signature {
  let bar = 0,
      beat = 0,
      pulse = -1;

  return {
    handlePulse (): Position {
      pulse += 1;

      if (pulse > ppqn - 1) {
        beat += 1;
        pulse = 0;

        if (beat > 3) {
          bar += 1;
          beat = 0;
        }
      }

      return createPosition({ bar, beat, pulse });
    }
  };
};

export { createSignature };
