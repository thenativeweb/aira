import { assert } from 'assertthat';
import { Duration } from '../../../../lib/music/elements/Duration';
import { translateDuration } from '../../../../lib/music/player/translateDuration';

suite('translateDuration', (): void => {
  const values: {
    duration: Duration;
    bpm: number;
    expected: number;
  }[] = [
    { duration: '1/4', bpm: 60, expected: 1_000 },
    { duration: '1/4', bpm: 120, expected: 500 },
    { duration: '1/4', bpm: 137, expected: 437 },
    { duration: '1/8', bpm: 60, expected: 500 },
    { duration: '1/8', bpm: 120, expected: 250 }
  ];

  for (const { duration, bpm, expected } of values) {
    test(`returns ${expected} ms for ${duration} and ${bpm} BPM.`, async (): Promise<void> => {
      assert.that(translateDuration({ duration, bpm })).is.equalTo(expected);
    });
  }
});
