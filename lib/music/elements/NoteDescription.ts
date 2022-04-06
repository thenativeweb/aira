import { Duration } from './Duration';
import { MidiValue } from '../../midi/MidiValue';

interface NoteDescription {
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
}

const isNoteDescription = function (candidate: any): candidate is NoteDescription {
  return (
    candidate.noteValue !== undefined &&
    candidate.velocity !== undefined &&
    candidate.duration !== undefined
  );
};

export {
  NoteDescription,
  isNoteDescription
};
