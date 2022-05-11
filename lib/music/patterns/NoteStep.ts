import { Note } from './../elements/Note';
import { MidiValue } from './../../midi/MidiValue';
import { Duration } from './../elements/Duration';

class NoteStep {

  public static DEFAULT_VELOCITY: MidiValue = 127;
  public static DEFAULT_DURATION: Duration = '1/4';

  public readonly velocity: MidiValue;
  public readonly duration: Duration;
  public readonly note: Note;

  public constructor(
    note: Note,
    velocity: MidiValue = NoteStep.DEFAULT_VELOCITY,
    duration: Duration  = NoteStep.DEFAULT_DURATION
  ) {
    this.note = note;
    this.velocity = velocity;
    this.duration = duration;
  }

}

export { NoteStep };