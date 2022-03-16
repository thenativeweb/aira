import { Duration } from '../elements/Duration';

const regex = /^(?<numerator>\d+)\/(?<denominator>\d+)(?<modifier>D|T)?$/u;

const getMillisecondsFromDuration = function ({ duration, bpm }: {
  duration: Duration;
  bpm: number;
}): number {
  const { numerator, denominator, modifier } =
    regex.exec(duration)!.groups!;

  let milliseconds = (Number(numerator) / Number(denominator)) * 4 * (60_000 / bpm);

  if (modifier === 'D') {
    milliseconds *= 1.5;
  } else if (modifier === 'T') {
    milliseconds *= 2 / 3;
  }

  return Math.floor(milliseconds);
};

export { getMillisecondsFromDuration };
