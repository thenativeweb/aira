import { AnyNoteNameWithOctave } from './AnyNoteName';
import { createNoteStep } from './../patterns/createNoteStep';
import { Duration } from './Duration';
import { MidiValue } from './../../midi/MidiValue';
import { Note } from './../elements/Note';
import { NoteStep } from './../patterns/NoteStep';
import { SemitoneShift } from './Note';
import { writeChord } from './writeChord';
import { ChordAddition, ChordConfiguration, ChordExtension, ChordQuality, ChordScalePosition } from './ChordConfiguration';

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
  hasEqualNotes: (other: Chord) => boolean;
  hasEqualNotesDisregardingOctave: (other: Chord) => boolean;
  getNoteSteps: (
    velocity?: MidiValue | Record<number, MidiValue> | Record<AnyNoteNameWithOctave, MidiValue>,
    duration?: Duration | Record<number, Duration> | Record<AnyNoteNameWithOctave, Duration>,
    constructorFn?: (note: Note, velocity?: MidiValue, duration?: Duration) => NoteStep
  ) => NoteStep[];
  clone: () => Chord;
}

class GenericChord implements Chord {
  protected static ExtensionSemitoneMap: Record<ChordExtension, number> = { 7: 10, 9: 14, 11: 17, 13: 21 };

  protected static AdditionSemitoneMap: Record<ChordAddition, number> = {
    '♭2': 1,
    b2: 1,
    2: 2,
    4: 5,
    '♭6': 8,
    b6: 8,
    6: 9,
    '♭7': 10,
    b7: 10,
    7: 11,
    '♭9': 13,
    b9: 13,
    9: 14,
    '♯9': 15,
    '#9': 15,
    11: 17,
    '♯11': 18,
    '#11': 18,
    '♭13': 20,
    b13: 20,
    13: 21
  };

  public readonly root: Note;

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
  public constructor (root: Note, configuration: ChordConfiguration) {
    this.root = root;
    this.configuration = configuration;

    const intermediateNotes: Note[] = [];

    this.handleRoot(intermediateNotes);
    this.handleAdditions(configuration.additions ?? [ ], intermediateNotes);
    this.handleThird(intermediateNotes);
    this.handleSuspension(intermediateNotes);
    this.handleFifth(intermediateNotes);
    this.handleExtensions(intermediateNotes);

    const uniqueIntermediateNotes = [ ...new Set(intermediateNotes) ];

    const noteSortComparator = (noteA: Note, noteB: Note): number =>
      (noteA.octave < noteB.octave) ||
      (noteA.octave === noteB.octave && noteA.value <= noteB.value) ?
        -1 :
        1;

    uniqueIntermediateNotes.sort(noteSortComparator);

    this.handleInversion(uniqueIntermediateNotes);
    this.handleDroppedVoices(uniqueIntermediateNotes);
    this.notes = uniqueIntermediateNotes.sort(noteSortComparator);

    this.chordName = writeChord(this);
  }

  public getNoteSteps (
    velocity: MidiValue | Record<number, MidiValue> | Record<AnyNoteNameWithOctave, MidiValue> = NoteStep.DefaultVelocity,
    duration: Duration | Record<number, Duration> | Record<AnyNoteNameWithOctave, Duration> = NoteStep.DefaultDuration,
    constructorFn: (note: Note, velocity?: MidiValue, duration?: Duration) => NoteStep = createNoteStep
  ): NoteStep[] {
    const getVelocityForNote =
      (
        noteIdx: number,
        note: Note
      ): MidiValue => {
        if (typeof velocity === 'number') {
          return velocity;
        }
        const separatedProperNameIdx = `${note.properName}_${note.octave}`;
        const separatedCommonNameIdx = `${note.commonName}_${note.octave}` as AnyNoteNameWithOctave;
        const properNameIdx = `${note.properName}${note.octave}`;
        const commonNameIdx = `${note.commonName}${note.octave}` as AnyNoteNameWithOctave;
        const velocityAsAnyIndexed = velocity as Record<number | AnyNoteNameWithOctave, MidiValue>;
        const noteStepVelocityFromSeparatedProperName: MidiValue | null =
          Object.hasOwn(velocityAsAnyIndexed, separatedProperNameIdx) ?
            velocityAsAnyIndexed[separatedProperNameIdx as any] :
            null;
        const noteStepVelocityFromProperName: MidiValue | null =
          Object.hasOwn(velocityAsAnyIndexed, properNameIdx) ?
            velocityAsAnyIndexed[properNameIdx as any] :
            null;
        const noteStepVelocityFromSeparatedCommonName: MidiValue | null =
          Object.hasOwn(velocityAsAnyIndexed, separatedCommonNameIdx) ?
            velocityAsAnyIndexed[separatedCommonNameIdx as any] :
            null;
        const noteStepVelocityFromCommonName: MidiValue | null =
          Object.hasOwn(velocityAsAnyIndexed, commonNameIdx) ?
            velocityAsAnyIndexed[commonNameIdx as any] :
            null;
        const noteStepVelocityFromIndexedObj: number = typeof velocity === 'number' ?
          0 :
          noteStepVelocityFromSeparatedProperName ??
          noteStepVelocityFromSeparatedCommonName ??
          noteStepVelocityFromProperName ??
          noteStepVelocityFromCommonName ??
          velocityAsAnyIndexed[noteIdx];

        return noteStepVelocityFromIndexedObj as MidiValue;
      };

    const getDurationForNote =
      (
        noteIdx: number,
        note: Note
      ): Duration => {
        if (typeof duration === 'string') {
          return duration;
        }
        const separatedProperNameIdx = `${note.properName}_${note.octave}` as any;
        const separatedCommonNameIdx = `${note.commonName}_${note.octave}` as AnyNoteNameWithOctave;
        const properNameIdx = `${note.properName}${note.octave}` as any;
        const commonNameIdx = `${note.commonName}${note.octave}` as AnyNoteNameWithOctave;
        const durationAsAnyIndexed = duration as Record<number | AnyNoteNameWithOctave, Duration>;
        const noteStepDurationFromSeparatedProperName =
          Object.hasOwn(durationAsAnyIndexed, separatedProperNameIdx) ?
            durationAsAnyIndexed[separatedProperNameIdx] :
            null;
        const noteStepDurationFromProperName =
          Object.hasOwn(durationAsAnyIndexed, properNameIdx) ?
            durationAsAnyIndexed[properNameIdx] :
            null;
        const noteStepDurationFromSeparatedCommonName =
          Object.hasOwn(durationAsAnyIndexed, separatedCommonNameIdx) ?
            durationAsAnyIndexed[separatedCommonNameIdx as any] :
            null;
        const noteStepDurationFromCommonName =
          Object.hasOwn(durationAsAnyIndexed, commonNameIdx) ?
            durationAsAnyIndexed[commonNameIdx as any] :
            null;
        const noteStepDurationFromIndexedObj = typeof duration === 'string' ?
          null :
          noteStepDurationFromSeparatedProperName ??
          noteStepDurationFromSeparatedCommonName ??
          noteStepDurationFromProperName ??
          noteStepDurationFromCommonName ??
          durationAsAnyIndexed[noteIdx];

        return noteStepDurationFromIndexedObj ?? '1/4';
      };

    const noteSteps: NoteStep[] = this.notes.map(
      (note: Note, i: number): NoteStep =>
        constructorFn(note, getVelocityForNote(i, note), getDurationForNote(i, note))
    );

    return noteSteps;
  }

  // To e.g. determine when chords are enharmonically identical but named/constructed differently
  public hasEqualNotes (other: Chord): boolean {
    const thisNoteIds = this.notes.map((note: Note): string => note.toString());
    const otherNoteIds = other.notes.map((note: Note): string => note.toString());

    return thisNoteIds.length === otherNoteIds.length &&
      thisNoteIds.every((val: string, idx: number): boolean => val === otherNoteIds[idx]);
  }

  public hasEqualNotesDisregardingOctave (other: Chord): boolean {
    const thisNoteValues = this.notes.map((note: Note): number => note.value);
    const otherNoteValues = other.notes.map((note: Note): number => note.value);

    return thisNoteValues.length === otherNoteValues.length &&
      thisNoteValues.every((val: number, idx: number): boolean => val === otherNoteValues[idx]);
  }

  public clone (): Chord {
    const clone = {};

    Object.assign(clone, this);

    return clone as GenericChord;
  }

  protected handleRoot (noteArray: Note[]): void {
    if (!(this.configuration.omissions ?? []).includes(1)) {
      noteArray.push(this.root);
    }
  }

  protected handleAdditions (additions: ChordAddition[], noteArray: Note[]): void {
    for (const addition of additions) {
      const totalSemitones = GenericChord.AdditionSemitoneMap[addition];
      const semitonesMod12 = totalSemitones % 12;
      const noOfOctaves = Math.floor(GenericChord.AdditionSemitoneMap[addition] / 12);
      const noteToAdd = this.root.getNoteFromInterval(
        semitonesMod12 as SemitoneShift,
        noOfOctaves
      );
      const additionStepNumPartMatch = (typeof addition !== 'string' ?
        /\d\d?/u.exec(addition.toString()) :
        /\d\d?/u.exec(addition)) as string[];
      const additionStep = Number.parseInt(additionStepNumPartMatch[0], 10) % 7;
      const properName = noteToAdd.getProperNameForChordNote(this.root, additionStep as ChordScalePosition);

      noteArray.push(
        typeof properName !== 'undefined' ?
          noteToAdd.withProperName(properName) :
          noteToAdd
      );
    }
  }

  protected handleThird (noteArray: Note[]): void {
    const qualityValue = Number(ChordQuality[this.configuration.quality]);

    if (qualityValue !== 0) {
      const semiToneShift = qualityValue as SemitoneShift;
      const noteToAdd = this.root.getNoteFromInterval(
        semiToneShift,
        0
      );

      const properName = noteToAdd.getProperNameForChordNote(this.root, 3);

      noteArray.push(
        typeof properName === 'undefined' ?
          noteToAdd :
          noteToAdd.withProperName(properName)
      );
    }
  }

  protected handleSuspension (noteArray: Note[]): void {
    if (this.configuration.quality.valueOf() === 'sus') {
      const suspension = this.configuration.suspension ?? 4;
      const suspendedInterval = suspension === 2 ? 2 : 5 as SemitoneShift;
      const noteToAdd = this.root.getNoteFromInterval(suspendedInterval, 0);
      const properName = noteToAdd.getProperNameForChordNote(this.root, suspension as ChordScalePosition);

      noteArray.push(
        typeof properName === 'undefined' ?
          noteToAdd :
          noteToAdd.withProperName(properName)
      );
    }
  }

  protected handleFifth (noteArray: Note[]): void {
    const fiveOmitted = (this.configuration.omissions ?? []).includes(5);
    const alterationsArr = this.configuration.alterations ?? [];
    const [ fifthSemitoneNegativeModifier, fifthSemitonePositiveModifier ] = [
      !fiveOmitted &&
      (
        alterationsArr.includes('b5') ||
        alterationsArr.includes('♭5') ||
        this.configuration.quality === 'dim' ||
        this.configuration.quality === 'halfDim'
      ) ?
        -1 :
        0,
      !fiveOmitted &&
      (
        alterationsArr.includes('#5') ||
        alterationsArr.includes('♯5') ||
        this.configuration.quality === 'Aug'
      ) ?
        1 :
        0
    ];
    const noteToAdd =
      fiveOmitted ?
        null :
        this.root.getNoteFromInterval(
          (7 + fifthSemitoneNegativeModifier + fifthSemitonePositiveModifier) as SemitoneShift,
          0
        );
    const properName = fiveOmitted ? null : noteToAdd!.getProperNameForChordNote(this.root, 5);
    const operation =
      fiveOmitted ?
        (): null => null :
        (): number =>
          noteArray.push(
            properName === null ?
              noteToAdd! :
              noteToAdd!.withProperName(properName!)
          );

    operation();
  }

  protected handleExtensions (noteArray: Note[]): void {
    for (const extension of this.configuration.extensions ?? []) {
      const semitoneShift = this.getTotalSemitoneShiftForExtension(extension);
      const omissionsArr = (this.configuration.omissions ?? []) as number[];

      if (!omissionsArr.includes(Number(extension))) {
        const currExtensionNote =
          this.root.getNoteFromInterval(
            semitoneShift % 12 as SemitoneShift,
            Math.floor(semitoneShift / 12)
          );
        const properName = currExtensionNote.getProperNameForChordNote(this.root, extension as ChordScalePosition);

        noteArray.push(
          typeof properName === 'undefined' ?
            currExtensionNote :
            currExtensionNote.withProperName(properName)
        );
      }
    }
  }

  protected getTotalSemitoneShiftForExtension (extension: ChordExtension): number {
    const baseSemitoneShift = GenericChord.ExtensionSemitoneMap[extension];
    const alterationsArr = (this.configuration.alterations ?? []) as string[];
    const semitoneShiftNegativeModifier =
      (extension === 7 && this.configuration.quality === 'dim') ||
      alterationsArr.includes(`b${extension}`) ||
      alterationsArr.includes(`♭${extension}`) ?
        -1 :
        0;
    const semitoneShiftPositiveModifier =
      (extension === 7 && [ 'Maj', 'Aug' ].includes(this.configuration.quality)) ||
      alterationsArr.includes(`#${extension}`) ||
      alterationsArr.includes(`♯${extension}`) ?
        +1 :
        0;

    return baseSemitoneShift + semitoneShiftNegativeModifier + semitoneShiftPositiveModifier;
  }

  protected handleInversion (uniqueSortedNotes: Note[]): void {
    const inversion = Math.min(uniqueSortedNotes.length, this.configuration.inversion ?? 0);
    const currHighestNote = uniqueSortedNotes.at(-1);
    const currHighestNoteOctave = currHighestNote!.octave;
    const currHighestNoteValue = currHighestNote!.value;
    const repeater = (operation: () => unknown, repetitions: number): void => {
      if (repetitions > 0) {
        operation();
        repeater(operation, repetitions - 1);
      }
    };

    repeater(
      (): void => {
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
            typeof currNoteToInvert.properName === 'undefined' ?
              currNoteToInvert.getNoteFromInterval(0, octaveShift) :
              currNoteToInvert.getNoteFromInterval(0, octaveShift).withProperName(currNoteToInvert.properName)
          );
        }
      },
      inversion
    );
  }

  protected handleDroppedVoices (noteArray: Note[]): void {
    const droppedNotes = [];
    const droppedNotesIdxs: number[] = [];
    const noOfNotes = noteArray.length;

    for (const dropVoice of this.configuration.droppedPositions ?? []) {
      if (dropVoice <= noOfNotes) {
        const dropVoiceIdx = noOfNotes - dropVoice;
        const droppedNote = noteArray[dropVoiceIdx];
        const noteToAdd =
          typeof droppedNote.properName !== 'undefined' ?
            droppedNote.getNoteFromInterval(0, -1).withProperName(droppedNote.properName) :
            droppedNote.getNoteFromInterval(0, -1);

        if (typeof droppedNote !== 'undefined') {
          droppedNotesIdxs.unshift(dropVoiceIdx);
          droppedNotes.unshift(noteToAdd);
        }
      }
    }
    for (const dropVoiceIdx of droppedNotesIdxs.reverse()) {
      noteArray.splice(dropVoiceIdx, 1);
    }
    noteArray.unshift(...droppedNotes);
  }
}

export { Chord };
export { GenericChord };
