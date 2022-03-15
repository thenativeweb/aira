import { assert } from 'assertthat';
import { Duration } from '../../../../lib/music/elements/Duration';
import { getMillisecondsFromDuration } from '../../../../lib/music/player/getMillisecondsFromDuration';

suite('getMillisecondsFromDuration', (): void => {
  const values: {
    duration: Duration;
    bpm: number;
    expected: number;
  }[] = [
    { duration: '1/4', bpm: 60, expected: 1_000 },
    { duration: '1/4', bpm: 120, expected: 500 },
    { duration: '1/4', bpm: 137, expected: 437 },
    { duration: '1/4D', bpm: 60, expected: 1_500 },
    { duration: '1/4T', bpm: 60, expected: 666 },
    { duration: '1/8', bpm: 60, expected: 500 },
    { duration: '1/8', bpm: 120, expected: 250 },
    { duration: '1/8D', bpm: 120, expected: 375 },
    { duration: '1/8T', bpm: 120, expected: 166 }
  ];

  for (const { duration, bpm, expected } of values) {
    test(`returns ${expected} ms for ${duration} and ${bpm} BPM.`, async (): Promise<void> => {
      assert.that(getMillisecondsFromDuration({ duration, bpm })).is.equalTo(expected);
    });
  }
});
