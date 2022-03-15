import { assert } from 'assertthat';
import { createPercent } from '../../../lib/math/createPercent';
import { PercentOutOfRange } from '../../../lib/errors';

suite('createPercent', (): void => {
  test('returns a percent value for the given value.', async (): Promise<void> => {
    assert.that(createPercent(23)).is.equalTo(23);
  });

  test('supports 0 percent.', async (): Promise<void> => {
    assert.that(createPercent(0)).is.equalTo(0);
  });

  test('supports 100 percent.', async (): Promise<void> => {
    assert.that(createPercent(100)).is.equalTo(100);
  });

  test('throws an error for values less than 0.', async (): Promise<void> => {
    assert.that((): void => {
      createPercent(-1);
    }).is.throwing<PercentOutOfRange>((ex): boolean => ex.code === PercentOutOfRange.code);
  });

  test('throws an error for values larger than 100.', async (): Promise<void> => {
    assert.that((): void => {
      createPercent(101);
    }).is.throwing<PercentOutOfRange>((ex): boolean => ex.code === PercentOutOfRange.code);
  });
});
