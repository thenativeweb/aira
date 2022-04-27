import { createMidiValue } from './createMidiValue';
import { MidiValue } from './MidiValue';
import { Note } from '../music/elements/Note';
import { NoteName } from '../music/elements/NoteName';
import { noteOffsets } from '../music/elements/noteOffsets';
import { Octave } from '../music/elements/Octave';

const regex = /^(?<noteName>[cdefgab]#?)(?<octave>-?\d)$/u;

const getNoteValue = function ({ note }: {
  note: Note;
}): MidiValue {
  const { noteName, octave } = regex.exec(note)!.groups!;

  const offset = noteOffsets[noteName as NoteName];

  const base = ((Number(octave) as Octave) + 1) * 12;
  const value = base + offset;

  return createMidiValue(value);
};

export { getNoteValue };
