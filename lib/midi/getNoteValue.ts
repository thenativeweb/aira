import { createMidiValue } from './createMidiValue';
import { MidiValue } from './MidiValue';
import { Note } from '../music/elements/Note';
import { noteOffsets } from '../music/elements/noteOffsets';
import { Octave } from '../music/elements/Octave';

const getNoteValue = function ({ note, octave }: {
  note: Note;
  octave: Octave;
}): MidiValue {
  const offset = noteOffsets[note];

  const base = (octave + 1) * 12;
  const value = base + offset;

  return createMidiValue(value);
};

export { getNoteValue };
