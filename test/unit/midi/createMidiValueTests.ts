import { assert } from 'assertthat';
import { createMidiValue } from '../../../lib/midi/createMidiValue';
import { MidiValueOutOfRange } from '../../../lib/errors';

suite('createMidiValue', (): void => {
  test('returns a MIDI value for the given value.', async (): Promise<void> => {
    assert.that(createMidiValue(47)).is.equalTo(47);
  });

  test('supports 0 as MIDI value.', async (): Promise<void> => {
    assert.that(createMidiValue(0)).is.equalTo(0);
  });

  test('supports 127 as MIDI value.', async (): Promise<void> => {
    assert.that(createMidiValue(127)).is.equalTo(127);
  });

  test('throws an error for values less than 0.', async (): Promise<void> => {
    assert.that((): void => {
      createMidiValue(-1);
    }).is.throwing<MidiValueOutOfRange>((ex): boolean => ex.code === MidiValueOutOfRange.code);
  });

  test('throws an error for values larger than 127.', async (): Promise<void> => {
    assert.that((): void => {
      createMidiValue(128);
    }).is.throwing<MidiValueOutOfRange>((ex): boolean => ex.code === MidiValueOutOfRange.code);
  });
});
