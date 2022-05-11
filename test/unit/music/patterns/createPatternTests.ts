import { assert } from 'assertthat';
import { createPattern, maxStepsPerBar } from '../../../../lib/music/patterns/createPattern';
import * as errors from '../../../../lib/errors';

suite('createPattern', (): void => {
  test('returns an empty pattern if no array is given.', async (): Promise<void> => {
    const pattern = createPattern();

    assert.that(pattern.length).is.equalTo(96);
    assert.that.eachElementOf(pattern).is.atLeast({
      noteSteps: [],
      controllerSteps: []
    });
  });

  test('returns an empty pattern if an empty array is given.', async (): Promise<void> => {
    const pattern = createPattern([]);

    assert.that(pattern.length).is.equalTo(96);
    assert.that.eachElementOf(pattern).is.atLeast({
      noteSteps: [],
      controllerSteps: []
    });
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
});
