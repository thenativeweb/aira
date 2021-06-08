import { assert } from 'assertthat';
import { getNoteValue } from '../../../lib/utils/getNoteValue';

suite('getNoteValue', (): void => {
  test('returns 0 for C-1.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c', octave: -1 })).is.equalTo(0);
  });

  test('returns 1 for C#-1.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c#', octave: -1 })).is.equalTo(1);
  });

  test('returns 12 for C0.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'c', octave: 0 })).is.equalTo(12);
  });

  test('returns 42 for F#2.', async (): Promise<void> => {
    assert.that(getNoteValue({ note: 'f#', octave: 2 })).is.equalTo(42);
  });
});
