import { assert } from 'assertthat';
import { Note } from '../../../../lib/music/elements/Note';
import { OctaveOutOfRange, EnharmonicallyIncompatibleNoteName } from '../../../../lib/errors';

suite('Note', (): void => {
  test('attempt to create note below octave bounds from existing note throws OctaveOutOfRange.', async (): Promise<void> => {
    const note = new Note('c',0);
    assert.that((): void => {
        note.getNoteFromInterval(0,-2);
      }).is.throwing<OctaveOutOfRange>((ex): boolean => ex.code === OctaveOutOfRange.code);
  });

  test('attempt to create note above octave bounds from existing note throws OctaveOutOfRange.', async (): Promise<void> => {
    const note = new Note('c',6);
    assert.that((): void => {
        note.getNoteFromInterval(0, 2);
      }).is.throwing<OctaveOutOfRange>((ex): boolean => ex.code === OctaveOutOfRange.code);
  });

  test('notes c# and D♭ on same octave are enharmonically identical.', async (): Promise<void> => {
    const noteA = new Note('c#',0);
    const noteB = new Note('D♭',0);
    assert.that(noteA.isEnharmonicallyIdenticalWith(noteB)).is.equalTo(true);
  });

  test('notes c# and D♭ on different octave are enharmonically identical disregarding octave.', async (): Promise<void> => {
    const noteA = new Note('c#',0);
    const noteB = new Note('D♭',1);
    assert.that( noteA.isEnharmonicallyIdenticalDisregardingOctaveWith(noteB)).is.equalTo(true);
  });

  test('notes c# and D on same octave are not enharmonically identical.', async (): Promise<void> => {
    const noteA = new Note('c#',0);
    const noteB = new Note('D',0);
    assert.that(noteA.isEnharmonicallyIdenticalWith(noteB)).is.equalTo(false);
  });

  test('notes c# and D on different octave are not enharmonically identical disregarding octave.', async (): Promise<void> => {
    const noteA = new Note('c#',0);
    const noteB = new Note('D',1);
    assert.that( noteA.isEnharmonicallyIdenticalDisregardingOctaveWith(noteB)).is.equalTo(false);
  });

  test('attempt to assign enharminically incompatible proper-name to note throws EnharmonicallyIncompatibleNoteName.', async (): Promise<void> => {
    const note = new Note('c',6);
    assert.that((): void => {
        note.withProperName('D');
      }).is.throwing<EnharmonicallyIncompatibleNoteName>((ex): boolean => ex.code === EnharmonicallyIncompatibleNoteName.code);
  });
});
