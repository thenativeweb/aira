import { NoteLengths } from '../types/NoteLengths';

const getNoteLengths = function ({ bpm }: {
  bpm: number;
}): NoteLengths {
  const quarter = 60_000 / bpm;

  const whole = quarter * 4;
  const half = quarter * 2;
  const eigth = quarter / 2;
  const sixteenth = quarter / 4;

  return {
    whole,
    half,
    quarter,
    eigth,
    sixteenth
  };
};

export { getNoteLengths };
