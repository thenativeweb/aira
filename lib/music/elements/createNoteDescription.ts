import { getNoteValue } from '../../midi/getNoteValue';
import { NoteDescription } from './NoteDescription';
import { NoteRecipe } from './NoteRecipe';

const createNoteDescription = function (noteRecipe: NoteRecipe): NoteDescription {
  if ('noteValue' in noteRecipe) {
    return {
      noteValue: noteRecipe.noteValue,
      velocity: noteRecipe.velocity,
      duration: noteRecipe.duration
    };
  }

  return {
    noteValue: getNoteValue({ note: noteRecipe.note, octave: noteRecipe.octave }),
    velocity: noteRecipe.velocity,
    duration: noteRecipe.duration
  };
};

export { createNoteDescription };
