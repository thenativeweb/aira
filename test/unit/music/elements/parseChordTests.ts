import { assert } from 'assertthat';
import { GenericChord } from '../../../../lib/music/elements/Chord';
import { Note } from '../../../../lib/music/elements/Note';
import { parseChord } from '../../../../lib/music/elements/parseChord';

suite('Chord', (): void => {
  test('chord-name C is correctly parsed as C major.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Maj' });

    assert.that(parseChord('C')).is.equalTo(expectedChord);
  });

  test('chord-name Cdim is correctly parsed as C diminished.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'dim' });

    assert.that(parseChord('Cdim')).is.equalTo(expectedChord);
  });

  test('chord-name C°7 is correctly parsed as C diminished 7.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'dim', extensions: [ 7 ]});

    assert.that(parseChord('C°7')).is.equalTo(expectedChord);
  });

  test('chord-name C/E is correctly parsed as C major in first inversion.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Maj', inversion: 1 });

    assert.that(parseChord('C/E')).is.equalTo(expectedChord);
  });

  test('chord-name Emin(addb6)(no5) is correctly parsed as E min with added flat6 and without fifth.', async (): Promise<void> => {
    const root = new Note('E', 0);
    const expectedChord = new GenericChord(root, { quality: 'min', additions: [ 'b6' ], omissions: [ 5 ]});

    assert.that(parseChord('Emin(addb6)(no5)')).is.equalTo(expectedChord);
  });

  test('chord-name C7 is correctly parsed as C dominant 7.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Dom', extensions: [ 7 ]});

    assert.that(parseChord('C7')).is.equalTo(expectedChord);
  });

  test('chord-name C_2Aug is correctly parsed as C augmented on octave 2.', async (): Promise<void> => {
    const root = new Note('C', 2);
    const expectedChord = new GenericChord(root, { quality: 'Aug' });

    assert.that(parseChord('C_2Aug')).is.equalTo(expectedChord);
  });

  test('chord-name C_2+ is correctly parsed as C augmented on octave 2.', async (): Promise<void> => {
    const root = new Note('C', 2);
    const expectedChord = new GenericChord(root, { quality: 'Aug' });

    assert.that(parseChord('C_2+')).is.equalTo(expectedChord);
  });

  test('chord-name Chalf2+ is correctly parsed as C augmented on octave 2.', async (): Promise<void> => {
    const root = new Note('C', 2);
    const expectedChord = new GenericChord(root, { quality: 'Aug' });

    assert.that(parseChord('C_2+')).is.equalTo(expectedChord);
  });

  test('chord-name ChalfDim7 is correctly parsed as C half-diminished 7.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'halfDim', extensions: [ 7 ]});

    assert.that(parseChord('ChalfDim7')).is.equalTo(expectedChord);
  });

  test('chord-name Cø7 is correctly parsed as C half-diminished 7.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'halfDim', extensions: [ 7 ]});

    assert.that(parseChord('Cø7')).is.equalTo(expectedChord);
  });

  test('chord-name Csus2 is correctly parsed as Csus2.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'sus', suspension: 2 });

    assert.that(parseChord('Csus2')).is.equalTo(expectedChord);
  });

  test('chord-name Csus4 is correctly parsed as Csus4.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'sus', suspension: 4 });

    assert.that(parseChord('Csus4')).is.equalTo(expectedChord);
  });

  test('chord-name C5 is correctly parsed as a power-chord on C.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Power' });

    assert.that(parseChord('C5')).is.equalTo(expectedChord);
  });

  test('chord-name C9 is correctly parsed as C dominant 9.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9 ]});

    assert.that(parseChord('C9')).is.equalTo(expectedChord);
  });

  test('chord-name C11 is correctly parsed as C dominant 11.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9, 11 ]});

    assert.that(parseChord('C11')).is.equalTo(expectedChord);
  });

  test('chord-name C13(no9,no11) is correctly parsed as C dominant 13 without 9 or 11.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 13 ], omissions: [ 9, 11 ]});

    assert.that(parseChord('C13(no9,no11)')).is.equalTo(expectedChord);
  });

  test('chord-name Cmadd11 is correctly parsed as C minor with added 11.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'min', additions: [ '11' ]});

    assert.that(parseChord('Cmadd11')).is.equalTo(expectedChord);
  });

  test('chord-name Cmaddb6add11 is correctly parsed as C minor with added flat 6 and with 11.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const expectedChord = new GenericChord(root, { quality: 'min', additions: [ 'b6', '11' ]});

    assert.that(parseChord('Cmaddb6add11')).is.equalTo(expectedChord);
  });

  test('chord-name C_3(#5) is correctly parsed as C major with augmented fifth on octave 3.', async (): Promise<void> => {
    const root = new Note('C', 3);
    const expectedChord = new GenericChord(root, { quality: 'Maj', alterations: [ '#5' ]});

    assert.that(parseChord('C_3(#5)')).is.equalTo(expectedChord);
  });

  test('chord-name C13(#5,b9) is correctly parsed as C dominant 13 with augmented fifth and flat 9.', async (): Promise<void> => {
    const root = new Note('C');
    const expectedChord = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9, 11, 13 ], alterations: [ '#5', 'b9' ]});

    assert.that(parseChord('C13(#5,b9)')).is.equalTo(expectedChord);
  });
});
