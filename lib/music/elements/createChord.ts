import { ChordConfiguration } from './ChordConfiguration';
import { Note } from './Note';
import { Chord, GenericChord } from './Chord';
import { mapToNote, NoteMappable } from './mapToNote';

const createChord = (
  root: NoteMappable,
  config: ChordConfiguration
): Chord => {
  const rootNote = root instanceof Note ?
    root :
    mapToNote(root);

  return new GenericChord(rootNote, config);
};

export { createChord };
