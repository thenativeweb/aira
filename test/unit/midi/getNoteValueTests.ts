import { assert } from 'assertthat';
import { getNoteValue } from '../../../lib/midi/getNoteValue';

suite('getNoteValue', (): void => {
  test('returns 0 for C-1.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c-1' })).is.equalTo(0);
  });

  test('returns 1 for C#-1.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c#-1' })).is.equalTo(1);
  });

  test('returns 12 for C0.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c0' })).is.equalTo(12);
  });

  test('returns 42 for F#2.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'f#2' })).is.equalTo(42);
  });
});
