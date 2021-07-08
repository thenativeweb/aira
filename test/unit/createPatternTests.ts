import { assert } from 'assertthat';
import { createPattern, maxStepsPerBar } from '../../lib/createPattern';
import * as errors from '../../lib/errors';

suite('createPattern', (): void => {
  test('throws an error if no steps are given.', async (): Promise<void> => {
    assert.that((): void => {
      createPattern([]);
    }).is.throwing<errors.PatternLengthInvalid>((ex): boolean => ex.code === errors.PatternLengthInvalid.code);
  });

  test('throws an error if too many steps are given.', async (): Promise<void> => {
    assert.that((): void => {
      // eslint-disable-next-line unicorn/no-new-array
      createPattern(new Array(maxStepsPerBar + 1).fill({ type: 'none' }));
    }).is.throwing<errors.PatternLengthInvalid>((ex): boolean => ex.code === errors.PatternLengthInvalid.code);
  });

  test('throws an error if 96 is not divisible by the number of steps.', async (): Promise<void> => {
    assert.that((): void => {
      // eslint-disable-next-line unicorn/no-new-array
      createPattern(new Array(20).fill({ type: 'none' }));
    }).is.throwing<errors.PatternLengthInvalid>((ex): boolean => ex.code === errors.PatternLengthInvalid.code);
  });

  test('returns a pattern with 96 steps.', async (): Promise<void> => {
    const pattern = createPattern([
      { type: 'beat' },
      { type: 'beat' },
      { type: 'beat' },
      { type: 'beat' }
    ]);

    assert.that(pattern.length).is.equalTo(maxStepsPerBar);

    assert.that(pattern[0]).is.equalTo({ type: 'beat' });
    assert.that(pattern[24]).is.equalTo({ type: 'beat' });
    assert.that(pattern[48]).is.equalTo({ type: 'beat' });
    assert.that(pattern[72]).is.equalTo({ type: 'beat' });

    const nonBeatSteps = pattern.filter((step): boolean => step.type === 'none');

    assert.that(nonBeatSteps.length).is.equalTo(maxStepsPerBar - 4);
  });
});
