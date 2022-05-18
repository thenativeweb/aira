import { AnyNoteName } from './../elements/AnyNoteName';
import { createNoteStep } from './createNoteStep';
import { Duration } from './../elements/Duration';
import { mapToNote } from './../elements/mapToNote';
import { MidiValue } from './../../midi/MidiValue';
import { Note } from './../elements/Note';
import { NoteStep } from './NoteStep';
import { Octave } from './../elements/Octave';
import { CommonNoteDesignator, CommonNoteName } from '../elements/CommonNoteName';
import { NoteDesignator, NoteName } from './../elements/NoteName';

// Could not implement full structured string type - too complex to represent
// `${AnyNoteName}_${Octave}_${MidiValue}_${Duration}` | `${AnyNoteName}${Octave}${MidiValue}${Duration}`
type NoteStepMappable =
  NoteStep |
  Note |
  NoteName |
  CommonNoteName |
  [AnyNoteName] |
  [AnyNoteName, Octave] |
  [AnyNoteName, Octave, MidiValue] |
  [AnyNoteName, Octave, MidiValue, Duration] |
  { name: AnyNoteName; octave?: Octave; velocity?: MidiValue; duration?: Duration } |
  { note: Note; velocity?: MidiValue; duration?: Duration } |
  `${AnyNoteName}_${Octave}` |
  `${AnyNoteName}_${Octave}_${Duration}` |
  `${AnyNoteName}${Octave}` |
  `${AnyNoteName}${Octave}${Duration}`;

const mapToNoteStep = (val: NoteStepMappable): NoteStep => {
  if (val instanceof NoteStep) {
    return val;
  }

  if (val instanceof Note) {
    return createNoteStep(val, NoteStep.DefaultVelocity, NoteStep.DefaultDuration);
  }

  if ((val as string in NoteDesignator) || (val as string in CommonNoteDesignator)) {
    return createNoteStep(mapToNote(val as AnyNoteName));
  }

  if (typeof val === 'string') {
    const valueArr = val.split('_', 4);
    const name = valueArr[0] as AnyNoteName;
    const octave = Number(valueArr[1] ?? Note.DefaultOctave) as Octave;
    const velocity = Number(valueArr[2] ?? NoteStep.DefaultVelocity) as MidiValue;
    const duration = (valueArr[3] ?? NoteStep.DefaultDuration) as Duration;

    return createNoteStep(mapToNote({ name, octave }), velocity, duration);
  }

  if ('name' in (val as object)) {
    const valObj = val as { name: AnyNoteName; octave?: Octave; velocity?: MidiValue; duration?: Duration };

    return createNoteStep(
      mapToNote({ name: valObj.name, octave: valObj.octave ?? Note.DefaultOctave }),
      valObj.velocity ?? NoteStep.DefaultVelocity,
      valObj.duration ?? NoteStep.DefaultDuration
    );
  }

  if ('note' in (val as object)) {
    const valObj = val as { note: Note; velocity?: MidiValue; duration?: Duration };

    return createNoteStep(
      valObj.note,
      valObj.velocity ?? NoteStep.DefaultVelocity,
      valObj.duration ?? NoteStep.DefaultDuration
    );
  }

  const valArr =
    val as [AnyNoteName] | [AnyNoteName, Octave] | [AnyNoteName, Octave, MidiValue] | [AnyNoteName, Octave, MidiValue, Duration];

  return createNoteStep(
    mapToNote({ name: valArr[0], octave: valArr[1] ?? Note.DefaultOctave }),
    valArr[2] ?? NoteStep.DefaultVelocity,
    valArr[3] ?? NoteStep.DefaultDuration
  );
};

export { NoteStepMappable };
export { mapToNoteStep };
