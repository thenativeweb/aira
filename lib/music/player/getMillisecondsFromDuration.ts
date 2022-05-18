import { Duration } from '../elements/Duration';

const regex = /^(?<numerator>\d+)\/(?<denominator>\d+)(?<modifier>D|T)?$/u;

const getMillisecondsFromDuration = function ({ duration, bpm }: {
  duration: Duration;
  bpm: number;
}): number {
  const { numerator, denominator, modifier } =
    regex.exec(duration)!.groups!;

  const milliseconds = (Number(numerator) / Number(denominator)) * 4 * (60_000 / bpm);
  const dottedMultiplier = modifier === 'D' ? 1.5 : 1;
  const tripletMultiplier = modifier === 'T' ? 2 / 3 : 1;

  return Math.floor(milliseconds * dottedMultiplier * tripletMultiplier);
};

export { getMillisecondsFromDuration };
