import { createMidiValue } from './createMidiValue';
import { MidiValue } from './MidiValue';
import { Note } from '../music/elements/Note';
import { NoteStep } from './../music/patterns/NoteStep';

const getNoteValue = (noteOrNoteStep: Note | NoteStep): MidiValue => {
  const noteRef = noteOrNoteStep instanceof NoteStep ? noteOrNoteStep.note : noteOrNoteStep;
  const base = (Number(noteRef.octave) + 1) * 12;
  const midiValue = base + noteRef.value;

  return createMidiValue(midiValue);
};

export { getNoteValue };
