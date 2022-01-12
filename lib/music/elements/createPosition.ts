import { Position } from './Position';

const createPosition = function ({ bar, beat, pulse }: {
  bar: number;
  beat: number;
  pulse: number;
}): Position {
  return { bar, beat, pulse };
};

export { createPosition };
