import { Duration } from './../elements/Duration';
import { MidiValue } from './../../midi/MidiValue';
import { Note } from './../elements/Note';
class NoteStep {
  public static DefaultVelocity: MidiValue = 127;

  public static DefaultDuration: Duration = '1/4';

  public readonly velocity: MidiValue;

  public readonly duration: Duration;

  public readonly note: Note;

  public constructor (
    note: Note,
    velocity: MidiValue = NoteStep.DefaultVelocity,
    duration: Duration = NoteStep.DefaultDuration
  ) {
    this.note = note;
    this.velocity = velocity;
    this.duration = duration;
  }
}

export { NoteStep };
