import { Note } from './Note';
import { NoteMappable } from './mapToNote';
import { ChordConfiguration } from './ChordConfiguration';
import { mapToNote } from './mapToNote';
import { Chord } from './Chord';
import { GenericChord } from './Chord';

const createChord = (
    root: Note | NoteMappable,
    config: ChordConfiguration
  ): Chord => {
    const rootNote = root instanceof Note ? root : [root].map(mapToNote)[0] as Note;
    return new GenericChord(rootNote, config);
};

export { createChord };