import { MidiValue } from './aira';
import { Note } from './types/Note';
import { Octave } from './types/Octave';

interface DrumStep {
  type: 'beat';
  noteOctave: {
    note: Note;
    octave: Octave;
  };
  velocity?: MidiValue;
}

interface NoteStep {
  type: 'note';
  noteOctave: {
    note: Note;
    octave: Octave;
  };
  velocity?: MidiValue;
}

interface NoneStep {
  type: 'none';
}

type Step = DrumStep | NoteStep | NoneStep;

export { Step };
