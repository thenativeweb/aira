import { MidiValue } from '../../midi/MidiValue';
import { Note } from '../elements/Note';
import { Octave } from '../elements/Octave';

interface NoteStep {
  type: 'note';
  note: Note;
  octave: Octave;
  velocity: MidiValue;
}

export {
  NoteStep
};
