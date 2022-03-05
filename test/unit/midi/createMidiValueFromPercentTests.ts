import { assert } from 'assertthat';
import { createMidiValueFromPercent } from '../../../lib/midi/createMidiValueFromPercent';
import { createPercent } from '../../../lib/math/createPercent';

suite('createMidiValueFromPercent', (): void => {
  test('returns a MIDI value for the given percent value.', async (): Promise<void> => {
    assert.that(createMidiValueFromPercent(createPercent(50))).is.equalTo(64);
  });

  test('returns 0 for 0 percent.', async (): Promise<void> => {
    assert.that(createMidiValueFromPercent(createPercent(0))).is.equalTo(0);
  });

  test('supports 127 for 100 percent.', async (): Promise<void> => {
    assert.that(createMidiValueFromPercent(createPercent(100))).is.equalTo(127);
  });
});
