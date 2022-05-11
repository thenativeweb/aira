import { assert } from 'assertthat';
import { Note } from '../../../../lib/music/elements/Note';
import { GenericChord } from '../../../../lib/music/elements/Chord';
import { NoteStep } from '../../../../lib/music/patterns/NoteStep';
import { MidiValue } from '../../../../lib/midi/MidiValue';
import { Duration } from '../../../../lib/music/elements/Duration';
import { AnyNoteNameWithOctave } from '../../../../lib/music/elements/AnyNoteName';

suite('Chord', (): void => {
  test('chord C major is written as C', async (): Promise<void> => {
    const root = new Note('C',0);
    const actualChordName = new GenericChord(root, {quality: 'Maj'}).chordName;
    const expectedChordName = 'C';
    assert.that(actualChordName).is.equalTo(expectedChordName);
  });

  test('chord Cdim7 is written C°7', async (): Promise<void> => {
    const root = new Note('C',0);
    const actualChordName = new GenericChord(root, {quality: 'dim', extensions: [7]}).chordName;
    const expectedChordName = 'C°7';
    assert.that(actualChordName).is.equalTo(expectedChordName);
  });

  test('chord C in first inversion is written C/E', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Maj', inversion: 1}).chordName;
    const expectedChordName = 'C/E'
    assert.that(chordName).is.equalTo(expectedChordName);
  });
  
  test('chord Emin(addb6)(no5) is written Emadd♭6(no5).', async (): Promise<void> => {
    const root = new Note('E',0);
    const chordName= new GenericChord(root, {quality: 'min', additions: ['b6'], omissions: [5]}).chordName;
    const expectedChordName = 'Emadd♭6(no5)';
    assert.that(chordName).is.equalTo(expectedChordName);
  });
  
  test('chord C7 is written C7', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Dom', extensions: [7]}).chordName;
    const expectedChordName = 'C7';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord CAug is written C+', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Aug'}).chordName;
    const expectedChordName = 'C+';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord ChalfDim7 is written Cø7', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'halfDim', extensions: [7]}).chordName;
    const expectedChordName = 'Cø7';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord Csus2 is written Csus2', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'sus', suspension: 2}).chordName;
    const expectedChordName = 'Csus2';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord Csus4 is written Csus4', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'sus', suspension: 4}).chordName;
    const expectedChordName = 'Csus4';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord C5 is written C5', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Power'}).chordName;
    const expectedChordName = 'C5';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord C9 is written C9', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Dom', extensions: [7,9]}).chordName;
    const expectedChordName = 'C9';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord C11 is written C11', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Dom', extensions: [7,9,11]}).chordName;
    const expectedChordName = 'C11';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord Cm11 is written Cm11', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'min', extensions: [7,9,11]}).chordName;
    const expectedChordName = 'Cm11';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord C13(no9,no11) is written C13(no9,no11)', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Dom', extensions: [7,9,11,13], omissions: [9,11]}).chordName;
    const expectedChordName = 'C13(no9,no11)';
    assert.that(chordName).is.equalTo(expectedChordName);
  });

  test('chord C(#5) is written C(♯5)', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Maj', alterations: ['#5']}).chordName;
    const expectedChordName = 'C(♯5)';
    assert.that(chordName).is.equalTo(expectedChordName);
  });  

  test('chord Cadd9(#5,b9) is written Cadd9(♯5,♭9)', async (): Promise<void> => {
    const root = new Note('C',0);
    const chordName = new GenericChord(root, {quality: 'Maj', alterations: ['#5','♭9'], additions: [9]}).chordName;
    const expectedChordName = 'Cadd9(♯5,♭9)';
    assert.that(chordName).is.equalTo(expectedChordName);
  });  

});
