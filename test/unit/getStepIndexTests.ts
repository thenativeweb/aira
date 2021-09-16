import { assert } from 'assertthat';
import { getStepIndex } from '../../lib/getStepIndex';

suite('getStepIndex', (): void => {
  test('returns 0 for beat 1 and pulse 1.', async (): Promise<void> => {
    assert.that(getStepIndex({ beatCounter: 1, pulseCounter: 1 })).is.equalTo(0);
  });

  test('returns 1 for beat 1 and pulse 2.', async (): Promise<void> => {
    assert.that(getStepIndex({ beatCounter: 1, pulseCounter: 2 })).is.equalTo(1);
  });

  test('returns 24 for beat 2 and pulse 1.', async (): Promise<void> => {
    assert.that(getStepIndex({ beatCounter: 2, pulseCounter: 1 })).is.equalTo(24);
  });
});
