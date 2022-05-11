import { NoteStep } from './NoteStep';
import { NoteName, NoteDesignator } from './../elements/NoteName';
import { AnyNoteName, AnyNoteNameWithOctave } from './../elements/AnyNoteName';
import { CommonNoteName, CommonNoteDesignator } from '../elements/CommonNoteName';
import { MidiValue } from './../../midi/MidiValue';
import { Octave } from './../elements/Octave';
import { Duration } from './../elements/Duration';
import { Note } from './../elements/Note';
import { createNoteStep } from './createNoteStep';
import { mapToNote } from './../elements/mapToNote';

type NoteStepMappable = NoteStep |
                        Note |
                        NoteName | 
                        CommonNoteName | 
                        [AnyNoteName] | 
                        [AnyNoteName, Octave] | 
                        [AnyNoteName, Octave, MidiValue] |
                        [AnyNoteName, Octave, MidiValue, Duration] |
                        {name: AnyNoteName, octave?: Octave, velocity?: MidiValue, duration?: Duration} |
                        {note: Note, velocity? : MidiValue, duration?: Duration} | 
                        `${AnyNoteName}_${Octave}` | 
                        `${AnyNoteName}_${Octave}_${Duration}` | 
                        `${AnyNoteName}${Octave}` | 
                        `${AnyNoteName}${Octave}${Duration}`;
                        // could not implement full structured string type - too complex to represent
                        // `${AnyNoteName}_${Octave}_${MidiValue}_${Duration}` | `${AnyNoteName}${Octave}${MidiValue}${Duration}`;
                        

const mapToNoteStep = (val: NoteStepMappable): NoteStep => {

    if (val instanceof NoteStep) {
      return val;
    }
    
    if (val instanceof Note) {
      return createNoteStep(val, NoteStep.DEFAULT_VELOCITY, NoteStep.DEFAULT_DURATION);
    }
    
    if ((val as string in NoteDesignator) || (val as string in CommonNoteDesignator)) {
        return createNoteStep(mapToNote(val as AnyNoteName));
    }
    
    if (typeof val === 'string') {
      const valueArr = val.split('_',4);
      const name = valueArr[0] as AnyNoteName;
      const octave = Number(valueArr[1] ?? Note.DEFAULT_OCTAVE) as Octave;
      const velocity = Number(valueArr[2] ?? NoteStep.DEFAULT_VELOCITY) as MidiValue;
      const duration = (valueArr[3] ?? NoteStep.DEFAULT_DURATION) as Duration;
      return createNoteStep(mapToNote({name :name, octave: octave}), velocity, duration);
    } 
        
    if ('name' in (val as object)) {
        const valObj = val as {name: AnyNoteName, octave?: Octave, velocity?: MidiValue, duration?: Duration};
        return createNoteStep(
          mapToNote({name: valObj.name, octave: valObj.octave ?? Note.DEFAULT_OCTAVE}),
          valObj.velocity ?? NoteStep.DEFAULT_VELOCITY,
          valObj.duration ?? NoteStep.DEFAULT_DURATION
        );
    }

    if ('note' in (val as object)) {
        const valObj = val as {note: Note, velocity?: MidiValue, duration?: Duration};
        return createNoteStep(
          valObj.note,
          valObj.velocity ?? NoteStep.DEFAULT_VELOCITY,
          valObj.duration ?? NoteStep.DEFAULT_DURATION
        );
    }

    const valArr = val as [AnyNoteName] | 
                          [AnyNoteName, Octave] | 
                          [AnyNoteName, Octave, MidiValue] |
                          [AnyNoteName, Octave, MidiValue, Duration];

    return createNoteStep(
      mapToNote({name: valArr[0], octave: valArr[1] ?? Note.DEFAULT_OCTAVE}),
      valArr[2] ?? NoteStep.DEFAULT_VELOCITY,
      valArr[3] ?? NoteStep.DEFAULT_DURATION
    );
}          
    
export { NoteStepMappable };
export { mapToNoteStep };