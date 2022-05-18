import { Duration } from './../elements/Duration';
import { MidiValue } from './../../midi/MidiValue';
import { Note } from './../elements/Note';
import { NoteStep } from './NoteStep';

const createNoteStep =
  (note: Note, velocity?: MidiValue, duration?: Duration): NoteStep =>
    new NoteStep(note, velocity, duration);

export { createNoteStep };
