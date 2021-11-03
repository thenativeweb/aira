import { assert } from 'assertthat';
import { getNoteValue } from '../../../lib/midi/getNoteValue';
import { sortBy } from 'lodash';

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

  test('lodash mutates arrays.', async (): Promise<void> => {
    const array = [
      { time: 2 }, { time: 1 }
    ];

    const newArray = sortBy(array, (current): number => current.time);

    assert.that(newArray === array).is.false();
  });
});
