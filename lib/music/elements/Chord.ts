import { Note } from './../elements/Note';
import { ChordConfiguration } from './ChordConfiguration';
import { ChordExtension } from './ChordConfiguration';
import { writeChord } from './writeChord';
import { NOTE_LETTERS } from './NoteLetters';
import { NoteName, NoteDesignator } from './NoteName';
import { ChordScalePosition } from './ChordConfiguration';
import { ChordAddition } from './ChordConfiguration';
import { SemitoneShift } from './Note';
import { ChordQuality } from './ChordConfiguration';
import { Octave } from './Octave';
import { NoteStep } from './../patterns/NoteStep';
import { createNoteStep } from './../patterns/createNoteStep';
import { Duration } from './Duration';
import { MidiValue } from './../../midi/MidiValue';
import { AnyNoteNameWithOctave } from './AnyNoteName';

/**
 *  Represents a chord as a collection of Notes with a root-Note, 
 *  a ChordConfiguration and a chordName which enables
 *  checking for (enharmonic) equivalence (with or without octave-match)
 *  and generation of NoteSteps for a Chord with velocity- and duration-values
 *  provided either as one value each for all notes or a Record mapping a numerical
 *  index (ascending from 0 in order of pitch) or a NoteName-octave constellation to 
 *  a MidiValue or a Duration-value respectively.
 * 
 *  Intended to be used as a return type of createChord and parseChord. 
 *  Describes a contract about providing:
 *   - a common midi-centric representation of the chord (in the note-values)
 *   - a simple way to generate NoteSteps for a chord (via getNoteSteps)
 *   - support for music-theory focussed workflow which
 *     enables derivation of accurate note-names for contained notes 
 *     (e.g. B𝄫 for the seventh of a Cdim7 chord)
 */
interface Chord {
  readonly root: Note;
  readonly notes: Note[];
  readonly configuration: ChordConfiguration;
  readonly chordName: string;
  hasEqualNotes(other: Chord): boolean;
  hasEqualNotesDisregardingOctave(other: Chord): boolean;
  getNoteSteps(
    velocity?: MidiValue | {[key: number]: MidiValue} | {[key in AnyNoteNameWithOctave]?: MidiValue}, 
    duration?: Duration  | {[key: number]: Duration} | {[key in AnyNoteNameWithOctave]?: Duration},
    constructorFn?: (note: Note, velocity?: MidiValue, duration?: Duration) => NoteStep
  ): NoteStep[];
  clone(): Chord;
}
  

class GenericChord implements Chord {
  
    protected static EXTENSION_SEMITONE_MAP: Record<ChordExtension,number> = {7: 10, 9: 14, 11: 17, 13: 21};
    protected static ADDITION_SEMITONE_MAP: Record<ChordAddition, number> = {
        '♭2': 1,
        'b2': 1,
        '2': 2,
        '4': 5,
        '♭6': 8,
        'b6': 8,
        '6': 9,
        '♭7': 10,
        'b7': 10,
        '7': 11,
        '♭9': 13,
        'b9': 13,
        '9': 14,
        '♯9': 15,
        '#9': 15,
        '11':17,
        '♯11': 18,
        '#11':18,
        '♭13': 20,
        'b13': 20,
        '13': 21
      };
  
    readonly root: Note;
    public readonly notes: Note[];
    public readonly configuration: ChordConfiguration;
    public readonly chordName: string;
  
    /**
     *  We set the root and configuration, then handle 
     *  the different chord-degrees and modifications 
     *  in separate protected methods, which access
     *  the root and configuration.
     * 
     *  A sorted array of notes is important for the procedures 
     *  employed for inversions and dropped voicing, which must
     *  be executed in the given order to achieve correct results.
     *  
     *  The name of the chord in uniform, noramlized UTF-8 representation
     *  will be determined automatically
     */
    public constructor(root: Note, configuration: ChordConfiguration) {
      this.root = root;
      this.configuration = configuration;
  
      const intermediateNotes: Note[] = [];
      this.handleRoot(intermediateNotes);
      this.handleAdditions(configuration.additions ?? [], intermediateNotes);
      this.handleThird(intermediateNotes);
      this.handleSuspension(intermediateNotes);
      this.handleFifth(intermediateNotes);
      this.handleExtensions(intermediateNotes);
  
      const uniqueIntermediateNotes = [...new Set(intermediateNotes)];
      uniqueIntermediateNotes.sort(this.noteSortComparator);      
  
      this.handleInversion(uniqueIntermediateNotes);
      this.handleDroppedVoices(uniqueIntermediateNotes);
      this.notes = uniqueIntermediateNotes.sort(this.noteSortComparator);
  
      this.chordName = writeChord(this);
    }

    public getNoteSteps(
        velocity: MidiValue | {[key: number]: MidiValue} | {[key in AnyNoteNameWithOctave]?: MidiValue} = NoteStep.DEFAULT_VELOCITY,
        duration: Duration  | {[key: number]: Duration}  | {[key in AnyNoteNameWithOctave]?: Duration}  = NoteStep.DEFAULT_DURATION, 
        constructorFn: (note: Note, velocity?: MidiValue, duration?: Duration) => NoteStep = createNoteStep
    ): NoteStep[] {
        const mapper = 
        (note: Note, i: number): NoteStep => {
          return constructorFn(note, this.getVelocityForNote(i, note, velocity), this.getDurationForNote(i, note, duration));
        };
      const noteSteps: NoteStep[] = this.notes.map(mapper);
      return noteSteps;
    }  
  
    // To e.g. determine when chords are enharmonically identical but named/constructed differently
    public hasEqualNotes(other: Chord): boolean {
      const noteIdMapper = (x: Note) => x.value + '_' + x.octave;
      const thisNoteIds = this.notes.map(noteIdMapper);
      const otherNoteIds = other.notes.map(noteIdMapper);
      return thisNoteIds.length === otherNoteIds.length &&
        thisNoteIds.every((v: string, i: number) => v === otherNoteIds[i]);
    }
  
    public hasEqualNotesDisregardingOctave(other: Chord): boolean {
      const noteValueMapper = (x: Note) => x.value;
      const thisNoteValues = this.notes.map(noteValueMapper);
      const otherNoteValues = other.notes.map(noteValueMapper);
      return thisNoteValues.length === otherNoteValues.length &&
        thisNoteValues.every((v: number, i: number) => v === otherNoteValues[i]);
    }

    public clone(): Chord {
        const clone = {};
        Object.assign(clone, this);
        return clone as GenericChord;
      }

    protected getChordScaleNoteLetters(rootNote: Note): string[] {
      const rootNoteName = (rootNote.properName ?? rootNote.commonName);
      const rootNoteLetter = rootNoteName.charAt(0).toUpperCase();
      const rootNoteLetterIndex = NOTE_LETTERS.indexOf(rootNoteLetter);
      const rotatedArray = [...NOTE_LETTERS.slice(rootNoteLetterIndex), ...NOTE_LETTERS.slice(0, rootNoteLetterIndex -1)];
      return rotatedArray;
    }
  
    protected getAllNoteNamesForValue = (value: number): NoteName[] => {
      return (Object.keys(NoteDesignator) as NoteName[]).filter(
        (x:string) => NoteDesignator[x as NoteName] === value
      );
    };
  
    protected getProperNameForChordNote(chordNote: Note, rootNote: Note, step: ChordScalePosition): NoteName|undefined {
      if (chordNote.value === rootNote.value) {
        return rootNote.properName;
      }
      if (typeof rootNote.properName === 'undefined') {
        return undefined;
      }
      const chordNoteLetters = this.getChordScaleNoteLetters(rootNote);
      const potentialNoteNames = this.getAllNoteNamesForValue(chordNote.value) ?? [];
      const letterToUse = (chordNoteLetters[step - 1] ?? chordNote.commonName.charAt(0)).toUpperCase();
      const noteNameToUse = potentialNoteNames.filter(
        (x:NoteName) => x.startsWith(letterToUse)
      )[0];
      return noteNameToUse;
    }
  
    protected handleRoot(noteArray: Note[]): void {
      if (!(this.configuration.omissions ?? []).includes(1)) {
        noteArray.push(this.root);
      }
    }
  
    protected noteSortComparator = (a: Note, b: Note) => {
      return (a.octave < b.octave) || (a.octave === b.octave && a.value <= b.value) ? -1 : 1;
    }
  
    protected handleAdditions(additions: ChordAddition[], noteArray: Note[]): void {
      for (const addition of (additions ?? [])) {
        const totalSemitones = GenericChord.ADDITION_SEMITONE_MAP[addition];
        const semitonesMod12 = totalSemitones % 12;
        const noOfOctaves = Math.floor(GenericChord.ADDITION_SEMITONE_MAP[addition] / 12);
        const noteToAdd = this.root.getNoteFromInterval(
          semitonesMod12 as SemitoneShift, 
          noOfOctaves
        );
        const additionStepNumPartMatch = ((typeof addition !== 'string') ? 
              addition.toString().match(/\d\d?/) : 
              addition.match(/\d\d?/)) as string[];
        const additionStep = (parseInt(additionStepNumPartMatch[0]) as number % 7) as ChordScalePosition;
        const properName = this.getProperNameForChordNote(noteToAdd, this.root, additionStep);
        noteArray.push(
            (typeof properName !== 'undefined') ? 
              noteToAdd.withProperName(properName) : 
              noteToAdd 
        );
      }
    }
  
    protected handleThird(noteArray: Note[]): void {
      const qualityValue = Number(ChordQuality[this.configuration.quality]);
      if (qualityValue !== 0) {
        const semiToneShift = qualityValue as SemitoneShift;
        const noteToAdd = this.root.getNoteFromInterval(
          semiToneShift,
          0
        );
        const properName = this.getProperNameForChordNote(noteToAdd, this.root, 3);
        noteArray.push(
            (typeof properName === 'undefined') ? 
              noteToAdd : 
              noteToAdd.withProperName(properName)
        );
      }
    }
  
    protected handleSuspension(noteArray: Note[]): void {
      if (this.configuration.quality.valueOf() === 'sus') {
        const suspension = this.configuration.suspension ?? 4;
        const suspendedInterval = suspension === 2 ? 2 : 5 as SemitoneShift;
        const noteToAdd = this.root.getNoteFromInterval(suspendedInterval,0);
        const properName = this.getProperNameForChordNote(noteToAdd, this.root, suspension as ChordScalePosition);
        noteArray.push(
            (typeof properName === 'undefined') ? 
              noteToAdd : 
              noteToAdd.withProperName(properName)
        );
      }
    }
 
    protected handleFifth(noteArray: Note[]): void {
        const fiveOmitted = (this.configuration.omissions ?? []).includes(5);
        const alterationsArr = this.configuration.alterations ?? [];
        const [fifthSemitoneNegativeModifier, fifthSemitonePositiveModifier] = [
          (
            !fiveOmitted && 
            (
              alterationsArr.includes('b5') || 
              alterationsArr.includes('♭5') || 
              this.configuration.quality === 'dim' ||
              this.configuration.quality === 'halfDim'
            ) ? 
              -1 : 
               0
          ),
          (
            !fiveOmitted && 
            (
                alterationsArr.includes('#5') || 
                alterationsArr.includes('♯5') || 
                this.configuration.quality === 'Aug'
            ) ?
              1 : 
              0
          )
        ];
        const noteToAdd = 
          fiveOmitted ? 
            null : 
            this.root.getNoteFromInterval(
              (7 + fifthSemitoneNegativeModifier + fifthSemitonePositiveModifier) as SemitoneShift,
              0
            );
        const properName = fiveOmitted ? null : this.getProperNameForChordNote(noteToAdd as Note, this.root, 5);
        const operation = 
          fiveOmitted ? 
            () => null : 
            () => { return noteArray.push(
                null === properName ?
                  noteToAdd as Note :
                  noteToAdd!.withProperName(properName as NoteName) as Note
              ); }
        operation();      
      }
  
    protected handleExtensions(noteArray: Note[]): void {
      for (const extension of (this.configuration.extensions ?? [])) {
        const semitoneShift = this.getTotalSemitoneShiftForExtension(extension);
        const omissionsArr = (this.configuration.omissions ?? []) as number[];
        if (!omissionsArr.includes(Number(extension))) {
          const currExtensionNote = 
          this.root.getNoteFromInterval(
            semitoneShift % 12 as SemitoneShift, 
            Math.floor(semitoneShift / 12)
          );
          const properName = this.getProperNameForChordNote(currExtensionNote, this.root, extension as ChordScalePosition);
          noteArray.push(
            (typeof properName === 'undefined') ? 
              currExtensionNote : 
              currExtensionNote.withProperName(properName)
          );
        }
      }
    }
  
    protected getTotalSemitoneShiftForExtension(extension: ChordExtension): number {
      const baseSemitoneShift = GenericChord.EXTENSION_SEMITONE_MAP[extension];
      const alterationsArr = (this.configuration.alterations ?? []) as string[];
      const semitoneShiftNegativeModifier = 
        (
          (extension === 7 && this.configuration.quality === 'dim') ||
          alterationsArr.includes('b' + extension) ||
          alterationsArr.includes('♭' + extension)
        )  ? -1 : 0;
      const semitoneShiftPositiveModifier = 
        (
          (extension === 7 && ['Maj','Aug'].includes(this.configuration.quality)) ||
          alterationsArr.includes('#' + extension) ||
          alterationsArr.includes('♯' + extension)
        )  ? +1 : 0;
        return baseSemitoneShift + semitoneShiftNegativeModifier + semitoneShiftPositiveModifier;
    }
  
    protected handleInversion(uniqueSortedNotes: Note[]): void {
      const inversion = Math.min(uniqueSortedNotes.length, (this.configuration.inversion ?? 0));
      const currHighestNote = uniqueSortedNotes[uniqueSortedNotes.length - 1];
      const currHighestNoteOctave = currHighestNote.octave;
      const currHighestNoteValue = currHighestNote.value;
      const repeater = (operation: () => unknown, repetitions: number) => {
        if (repetitions > 0) {
            operation();
            () => repeater(operation, repetitions - 1);
        }
      };
      repeater(
        () => {
            const currNoteToInvert = uniqueSortedNotes.shift();
            if (typeof currNoteToInvert !== 'undefined') {
              // We have to shift by two octaves if the chord extends over 2 octaves already  
              const octaveShift = 
                (currNoteToInvert.octave + 1) > currHighestNoteOctave || 
                (
                  (currNoteToInvert.octave + 1) === currHighestNoteOctave && 
                  currHighestNoteValue < currNoteToInvert.value
                ) ? 
                  1 : 
                  2;
              uniqueSortedNotes.unshift(
                (typeof currNoteToInvert.properName === 'undefined') ?
                  currNoteToInvert.getNoteFromInterval(0, octaveShift) :
                  currNoteToInvert.getNoteFromInterval(0, octaveShift).withProperName(currNoteToInvert.properName)
              );
            }
        },
        inversion
      );
    }
  
    protected handleDroppedVoices(noteArray: Note[]): void {
      const droppedNotes = [];
      const droppedNotesIdxs: number[] = [];
      const noOfNotes = noteArray.length;
      for (const dropVoice of (this.configuration.droppedPositions ?? [])) {
        if (dropVoice <= noOfNotes) {
          const dropVoiceIdx = noOfNotes - dropVoice;
          const droppedNote = noteArray[dropVoiceIdx];
          if (typeof droppedNote !== 'undefined') {
            droppedNotesIdxs.unshift(dropVoiceIdx);
            droppedNotes.unshift(
              droppedNote.getNoteFromInterval(0,-1).withProperName(droppedNote.properName as NoteName)
            );
          }
        }
      }
      for (const dropVoiceIdx of droppedNotesIdxs.reverse()) {
        noteArray.splice(dropVoiceIdx,1);
      }
      noteArray.unshift(...droppedNotes);
    }
  
    protected determineOctave(rootValue: number, rootOctave: Octave, intervalValue: number): Octave {
      return intervalValue < rootValue ? Math.min(rootOctave + 1, 7) as Octave: rootOctave;
    }

    protected getVelocityForNote(
        n: number, 
        note: Note, 
        velocity: MidiValue | {[key: number]: MidiValue} | {[key in AnyNoteNameWithOctave]: MidiValue}
    ): MidiValue {
        const separatedProperNameIdx = ((note.properName ?? '') + '_' + note.octave);
        const separatedCommonNameIdx = note.commonName + '_' + note.octave;
        const properNameIdx = (note.properName ?? '') + note.octave;
        const commonNameIdx = note.commonName + note.octave;
        const noteStepVelocityFromNumber = (typeof velocity === 'number') ? velocity : 0;
        const velocityAsAnyIndexed = velocity as {[key: string | number]: MidiValue};
        const noteStepVelocityFromIndexedObj = (typeof velocity === 'number') ? 0 : 
          velocityAsAnyIndexed[n] ??
          velocityAsAnyIndexed[separatedProperNameIdx] ??
          velocityAsAnyIndexed[separatedCommonNameIdx] ?? 
          velocityAsAnyIndexed[properNameIdx] ?? 
          velocityAsAnyIndexed[commonNameIdx];

        return (noteStepVelocityFromNumber + noteStepVelocityFromIndexedObj) as MidiValue;
    }

    protected getDurationForNote(
      n: number, 
      note: Note, 
      duration: Duration |  {[key: number]: Duration} | {[key in AnyNoteNameWithOctave]: Duration}
    ): Duration {
      const separatedProperNameIdx = ((note.properName ?? '') + '_' + note.octave);
      const separatedCommonNameIdx = note.commonName + '_' + note.octave;
      const properNameIdx = (note.properName ?? '') + note.octave;
      const commonNameIdx = note.commonName + note.octave;
      const noteStepDurationFromString = (typeof duration === 'string') ? duration : null;
      const durationAsAnyIndexed = duration as {[key: string | number]: Duration};
      const noteStepDurationFromIndexedObj = (typeof duration === 'string') ? null : 
        durationAsAnyIndexed[n] ??
        durationAsAnyIndexed[separatedProperNameIdx] ??
        durationAsAnyIndexed[separatedCommonNameIdx] ?? 
        durationAsAnyIndexed[properNameIdx] ?? 
        durationAsAnyIndexed[commonNameIdx];

      return noteStepDurationFromString ?? noteStepDurationFromIndexedObj ?? '1/4';
    }

}

export { Chord };
export { GenericChord };