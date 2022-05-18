import { assert } from 'assertthat';
import { mapToNote } from '../../../lib/music/elements/mapToNote';
import { Note } from '../../../lib/music/elements/Note';

suite('mapToNote', (): void => {
  // Test direct concatenation of commonName and octave
  test('returns commonName c, value 0, octave -1 for c-1.', async (): Promise<void> => {
    assert.that(mapToNote('c-1')).is.equalTo({ commonName: 'c', value: 0, octave: -1 } as Note);
  });

  test('returns commonName c#, value 1, octave -1 for c#-1.', async (): Promise<void> => {
    assert.that(mapToNote('c#-1')).is.equalTo({ commonName: 'c#', value: 1, octave: -1 } as Note);
  });

  test('returns commonName c, value 0, octave 0 for c0.', async (): Promise<void> => {
    assert.that(mapToNote('c0')).is.equalTo({ commonName: 'c', value: 0, octave: 0 } as Note);
  });

  test('returns commonName f#, value 6 ,octave 2 for f#2.', async (): Promise<void> => {
    assert.that(mapToNote('f#2')).is.equalTo({ commonName: 'f#', value: 6, octave: 2 } as Note);
  });

  test('returns commonName f#, properName G♭, value 6 ,octave 2 for G♭2.', async (): Promise<void> => {
    assert.that(mapToNote('G♭2')).is.equalTo({ commonName: 'f#', properName: 'G♭', value: 6, octave: 2 } as Note);
  });

  // Test underscore separated concatenation of name and octave
  test('returns commonName c, value 0, octave -1 for C_-1.', async (): Promise<void> => {
    assert.that(mapToNote('C_-1')).is.equalTo({ commonName: 'c', properName: 'C', value: 0, octave: -1 } as Note);
  });

  test('returns commonName c#, properName C♯, value 1, octave -1 for C♯_-1.', async (): Promise<void> => {
    assert.that(mapToNote('C♯_-1')).is.equalTo({ commonName: 'c#', properName: 'C♯', value: 1, octave: -1 } as Note);
  });

  test('returns commonName c, properName C value 0, octave 0 for C_0.', async (): Promise<void> => {
    assert.that(mapToNote('C_0')).is.equalTo({ commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note);
  });

  test('returns commonName f#, properName F♯, value 6 ,octave 2 for F♯_2.', async (): Promise<void> => {
    assert.that(mapToNote('F♯_2')).is.equalTo({ commonName: 'f#', properName: 'F♯', value: 6, octave: 2 } as Note);
  });

  test('returns commonName f#, properName G♭, value 6 ,octave 2 for G♭_2.', async (): Promise<void> => {
    assert.that(mapToNote('G♭_2')).is.equalTo({ commonName: 'f#', properName: 'G♭', value: 6, octave: 2 } as Note);
  });

  // Test array of common name / proper name (and octave)
  test('returns commonName c, value 0, octave 0 for [c].', async (): Promise<void> => {
    assert.that(mapToNote([ 'c' ])).is.equalTo({ commonName: 'c', value: 0, octave: 0 } as Note);
  });

  test('returns commonName c, value 0, octave -1 for [c, -1].', async (): Promise<void> => {
    assert.that(mapToNote([ 'c', -1 ])).is.equalTo({ commonName: 'c', value: 0, octave: -1 } as Note);
  });

  test('returns commonName c#, value 1, octave -1 for [c#, -1].', async (): Promise<void> => {
    assert.that(mapToNote([ 'c#', -1 ])).is.equalTo({ commonName: 'c#', value: 1, octave: -1 } as Note);
  });

  test('returns commonName c, value 0, octave 0 for [c, 0].', async (): Promise<void> => {
    assert.that(mapToNote([ 'c', 0 ])).is.equalTo({ commonName: 'c', value: 0, octave: 0 } as Note);
  });

  test('returns commonName f#, properName F♯, value 6 ,octave 2 for [F♯, 2].', async (): Promise<void> => {
    assert.that(mapToNote([ 'F♯', 2 ])).is.equalTo({ commonName: 'f#', properName: 'F♯', value: 6, octave: 2 } as Note);
  });

  test('returns commonName f#, properName G♭, value 6 ,octave 2 for [G♭, 2].', async (): Promise<void> => {
    assert.that(mapToNote([ 'G♭', 2 ])).is.equalTo({ commonName: 'f#', properName: 'G♭', value: 6, octave: 2 } as Note);
  });

  // Test object with name and optional octave
  test('returns commonName c, value 0, octave 0 for {name: c}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'c' })).is.equalTo({ commonName: 'c', value: 0, octave: 0 } as Note);
  });

  test('returns commonName c, value 0, octave -1 for {name: c, octave: -1}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'c', octave: -1 })).is.equalTo({ commonName: 'c', value: 0, octave: -1 } as Note);
  });

  test('returns commonName c#, value 1, octave -1 for {name: c#, octave: -1}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'c#', octave: -1 })).is.equalTo({ commonName: 'c#', value: 1, octave: -1 } as Note);
  });

  test('returns commonName c, value 0, octave 0 for {name: c, octave: 0}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'c', octave: 0 })).is.equalTo({ commonName: 'c', value: 0, octave: 0 } as Note);
  });

  test('returns commonName f#, properName F♯, value 6 ,octave 2 for {name: F♯, octave: 2}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'F♯', octave: 2 })).is.equalTo({ commonName: 'f#', properName: 'F♯', value: 6, octave: 2 } as Note);
  });

  test('returns commonName f#, properName G♭, value 6 ,octave 2 for {name: G♭, octave: 2}.', async (): Promise<void> => {
    assert.that(mapToNote({ name: 'G♭', octave: 2 })).is.equalTo({ commonName: 'f#', properName: 'G♭', value: 6, octave: 2 } as Note);
  });
});
