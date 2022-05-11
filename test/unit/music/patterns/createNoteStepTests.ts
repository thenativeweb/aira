import { assert } from 'assertthat';
import { createNoteStep } from '../../../../lib/music/patterns/createNoteStep';
import { NoteStep } from '../../../../lib/music/patterns/NoteStep';
import { Note } from '../../../../lib/music/elements/Note';

suite('createNoteStep', (): void => {
  test('returns a noteStep matching the given note, velocity, and duration.', async (): Promise<void> => {
    const note = new Note('C',1);
    const actualNoteStep = createNoteStep(note, 100, '1/8T');

    const expectedNoteStep: NoteStep = {
      note: note,
      velocity: 100,
      duration: '1/8T'
    };

    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });
});
