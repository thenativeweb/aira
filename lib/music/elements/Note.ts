import { Octave } from './Octave';
import { NoteName, NoteDesignator } from './NoteName';
import { CommonNoteName, CommonNoteDesignator } from './CommonNoteName';
import { AnyNoteName } from './AnyNoteName';
import { OctaveOutOfRange, NoteNameInvalid, EnharmonicallyIncompatibleNoteName } from './../../errors';

/**
 *  Represents the meaningful semitone shifts below entire octave-shifts
 */
type SemitoneShift = -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 
                       0 | 
                       1 |  2  |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11;

/**
 * Immutable implementation for using and naming notes as (midi-related) semi-tones and octaves
 * as well as as musical note-names for music-theory oriented usage in code and potential frontends 
 * (as a unique common name which disregards enharmonic equivalence and a context-related proper name).
 * 
 * Also contains methods enabling fluent adding of proper names, 
 * generating new Notes from a given Note and specification of an octave/semitone shift, as well as
 * checking for (enharmonic) equivalence (with or without octave-match).
 * 
 * Intended to be used in cooperation with createNote, mapToNote, NoteStep, mapToNoteStep and Chord
 */
class Note {

  public static DEFAULT_OCTAVE: Octave = 0;

  public readonly value:        number;
  public readonly octave:       Octave;
  public readonly commonName:   CommonNoteName;
  public properName?:           NoteName;

  public constructor(
    name: AnyNoteName, 
    octave: Octave = Note.DEFAULT_OCTAVE
  ) {
    this.octave = octave;

    if (name in NoteDesignator) {
      this.properName = name as NoteName;
      this.value = NoteDesignator[name as keyof typeof NoteDesignator];
      const commonName = CommonNoteDesignator[this.value];
      if (typeof commonName === 'undefined') {
        throw new TypeError(`No common note-name is defined for value ${this.value}.`);
      }
      this.commonName = CommonNoteDesignator[this.value] as keyof typeof CommonNoteDesignator;
    } else if (name in CommonNoteDesignator) {
      this.commonName = name as keyof typeof CommonNoteDesignator;
      this.value = CommonNoteDesignator[this.commonName];
    } else {
      throw new NoteNameInvalid(`Note-name ${name} is invalid.`);
    }
  }

  public getNoteFromInterval(semiToneShift: SemitoneShift, octaveShift: number): Note
  {
    const intermediateVal = (this.value + semiToneShift) % 12
    const newValue = intermediateVal < 0 ? (11 + intermediateVal) : intermediateVal;
    const valueOctaveModifierSubtraction = (semiToneShift < 0 && newValue > this.value) ? -1 : 0;
    const valueOctaveModifierAddition = (semiToneShift > 0 && newValue < this.value) ? 1 : 0;
    const valueOctaveModifier = valueOctaveModifierSubtraction + valueOctaveModifierAddition;
    const newOctaveInt = this.octave + valueOctaveModifier + octaveShift;
    if (newOctaveInt < -1 || newOctaveInt > 7) {
        throw new OctaveOutOfRange();
    }
    const newOctave = newOctaveInt as Octave;
    const noteName = CommonNoteDesignator[newValue] as CommonNoteName;
    if (typeof noteName === 'undefined') {
      throw new NoteNameInvalid(`No note-name exists for new value ${newValue} from this value ${this.value}, semitone-shift ${semiToneShift} and octave shift ${octaveShift}.`);
    }
    return new Note(noteName, newOctave);
  }

  public isEnharmonicallyIdenticalWith(other: Note): boolean {
    return other.value + '_' + other.octave === this.value + '_' + this.octave;
  }

  public isEnharmonicallyIdenticalDisregardingOctaveWith(other: Note): boolean {
    return other.value === this.value;
  }

  public withProperName(properName: NoteName): Note {
    if (NoteDesignator[properName] !== this.value) {
      throw new EnharmonicallyIncompatibleNoteName(`Provided proper name ${properName} is not enharmonically compatible with common name ${this.commonName}.`);
    }
    return new Note(properName, this.octave);
  }

}
export { SemitoneShift }
export { Note };