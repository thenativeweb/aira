import { Duration } from './Duration';
import { getNoteValue } from '../../midi/getNoteValue';
import { MidiValue } from '../../midi/MidiValue';
import { Note } from './Note';
import { NoteDescription } from './NoteDescription';
import { Octave } from './Octave';

type CreateNoteDescriptionOptions = {
  note: Note;
  octave: Octave;
  velocity: MidiValue;
  duration: Duration;
} | {
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
};

const createNoteDescription = function (options: CreateNoteDescriptionOptions): NoteDescription {
  if ('noteValue' in options) {
    return {
      noteValue: options.noteValue,
      velocity: options.velocity,
      duration: options.duration
    };
  }

  return {
    noteValue: getNoteValue({ note: options.note, octave: options.octave }),
    velocity: options.velocity,
    duration: options.duration
  };
};

export { createNoteDescription };
