import { AnyNoteNameWithOctave } from '../../../../lib/music/elements/AnyNoteName';
import { assert } from 'assertthat';
import { Duration } from '../../../../lib/music/elements/Duration';
import { GenericChord } from '../../../../lib/music/elements/Chord';
import { MidiValue } from '../../../../lib/midi/MidiValue';
import { Note } from '../../../../lib/music/elements/Note';
import { NoteStep } from '../../../../lib/music/patterns/NoteStep';

suite('Chord', (): void => {
  test('chord C major on octave zero has notes C_0, E_0, G_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Maj' });
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord Cdim7 on octave zero has notes C_0, E♭_0, G♭_0, B𝄫_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'dim', extensions: [ 7 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'd#', properName: 'E♭', value: 3, octave: 0 } as Note,
      { commonName: 'f#', properName: 'G♭', value: 6, octave: 0 } as Note,
      { commonName: 'a', properName: 'B𝄫', value: 9, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chords C/E and Emin(addb6)(no5) on same octave have the same notes.', async (): Promise<void> => {
    const rootA = new Note('C', 0);
    const rootB = new Note('E', 0);
    const chordA = new GenericChord(rootA, { quality: 'Maj', inversion: 1 });
    const chordB = new GenericChord(rootB, { quality: 'min', additions: [ 'b6' ], omissions: [ 5 ]});

    assert.that(chordA.hasEqualNotes(chordB)).is.equalTo(true);
  });

  test('chords C/E and Emin(addb6)(no5) on different octaves have the same notes disregarding octaves.', async (): Promise<void> => {
    const rootA = new Note('C', 0);
    const rootB = new Note('E', 1);
    const chordA = new GenericChord(rootA, { quality: 'Maj', inversion: 1 });
    const chordB = new GenericChord(rootB, { quality: 'min', additions: [ 'b6' ], omissions: [ 5 ]});

    assert.that(chordA.hasEqualNotesDisregardingOctave(chordB)).is.equalTo(true);
  });

  test('can get note steps with correct notes and default velocity/duration from C major chord.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const chord = new GenericChord(root, { quality: 'Maj' });
    const [ noteC, noteE, noteG ] = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];
    const expected = [
      { note: noteC, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep,
      { note: noteE, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep,
      { note: noteG, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep
    ];
    const noteSteps = chord.getNoteSteps();

    assert.that(noteSteps).is.equalTo(expected);
  });

  test('can get note steps with same custom velocity and duration for all notes from C major chord.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const chord = new GenericChord(root, { quality: 'Maj' });
    const velocity = 100;
    const duration = '1/16';
    const [ noteC, noteE, noteG ] = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];
    const expected = [
      { note: noteC, velocity, duration } as NoteStep,
      { note: noteE, velocity, duration } as NoteStep,
      { note: noteG, velocity, duration } as NoteStep
    ];
    const noteSteps = chord.getNoteSteps(velocity, duration);

    assert.that(noteSteps).is.equalTo(expected);
  });

  test('can get note steps with individual custom velocity and duration by note-number from C major chord.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const chord = new GenericChord(root, { quality: 'Maj' });
    const velocities: Record<number, MidiValue> = { 0: 100, 1: 90, 2: 80 };
    const durations: Record<number, Duration> = { 0: '1/4', 1: '1/8', 2: '1/16' };
    const [ noteC, noteE, noteG ] = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];
    const expected = [
      { note: noteC, velocity: velocities[0], duration: durations[0] } as NoteStep,
      { note: noteE, velocity: velocities[1], duration: durations[1] } as NoteStep,
      { note: noteG, velocity: velocities[2], duration: durations[2] } as NoteStep
    ];
    const noteSteps = chord.getNoteSteps(velocities, durations);

    assert.that(noteSteps).is.equalTo(expected);
  });

  test('can get note steps with individual custom velocity and duration by note-name from C major chord.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const chord = new GenericChord(root, { quality: 'Maj' });
    const velocities: {[key in AnyNoteNameWithOctave]?: MidiValue } = { c0: 100, e0: 90, g0: 80 };
    const durations: {[key in AnyNoteNameWithOctave]?: Duration } = { C0: '1/4', E0: '1/8', G0: '1/16' };
    const [ noteC, noteE, noteG ] = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];
    const expected = [
      { note: noteC, velocity: velocities.c0, duration: durations.C0 } as NoteStep,
      { note: noteE, velocity: velocities.e0, duration: durations.E0 } as NoteStep,
      { note: noteG, velocity: velocities.g0, duration: durations.G0 } as NoteStep
    ];
    const noteSteps = chord.getNoteSteps(velocities, durations);

    assert.that(noteSteps).is.equalTo(expected);
  });

  test('can get note steps with correct notes and default velocity/duration by custom constructor from C major chord.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const chord = new GenericChord(root, { quality: 'Maj' });
    const [ noteC, noteE, noteG ] = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];
    const customConstructor = (note: Note, velocity?: MidiValue, duration?: Duration): NoteStep => new NoteStep(note, velocity, duration);
    const expected = [
      { note: noteC, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep,
      { note: noteE, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep,
      { note: noteG, velocity: NoteStep.DefaultVelocity, duration: NoteStep.DefaultDuration } as NoteStep
    ];
    const noteSteps = chord.getNoteSteps(undefined, undefined, customConstructor);

    assert.that(noteSteps).is.equalTo(expected);
  });

  test('chord C major on octave zero in first inversion has notes E_0, G_0, C_1.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Maj', inversion: 1 });
    const expected = [
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'c', properName: 'C', value: 0, octave: 1 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C7 on octave zero has notes C_0, E_0, G_0, B♭_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Dom', extensions: [ 7 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord CAug on octave zero has notes C_0, E_0, G♯_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Aug' });
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g#', properName: 'G♯', value: 8, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord ChalfDim7 on octave zero has notes C_0, E♭_0, G♭_0, B♭_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'halfDim', extensions: [ 7 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'd#', properName: 'E♭', value: 3, octave: 0 } as Note,
      { commonName: 'f#', properName: 'G♭', value: 6, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord Csus2 on octave zero has notes C_0, D_0, G_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'sus', suspension: 2 });
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'd', properName: 'D', value: 2, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord Csus4 on octave zero has notes C_0, F_0, G_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'sus', suspension: 4 });
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'f', properName: 'F', value: 5, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C5 on octave zero has notes C_0, G_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Power' });
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C9 on octave zero has notes C_0, E_0, G_0, B♭_0, D_1.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note,
      { commonName: 'd', properName: 'D', value: 2, octave: 1 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C11 on octave zero has notes C_0, E_0, G_0, B♭_0, D_1, F_1.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9, 11 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note,
      { commonName: 'd', properName: 'D', value: 2, octave: 1 } as Note,
      { commonName: 'f', properName: 'F', value: 5, octave: 1 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord Cm11 on octave zero has notes C_0, E_0, G_0, B♭_0, D_1, F_1.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'min', extensions: [ 7, 9, 11 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'd#', properName: 'E♭', value: 3, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note,
      { commonName: 'd', properName: 'D', value: 2, octave: 1 } as Note,
      { commonName: 'f', properName: 'F', value: 5, octave: 1 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C13(no9, no11) on octave zero has notes C_0, E_0, G_0, B♭_0, A_1.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Dom', extensions: [ 7, 9, 11, 13 ], omissions: [ 9, 11 ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g', properName: 'G', value: 7, octave: 0 } as Note,
      { commonName: 'a#', properName: 'B♭', value: 10, octave: 0 } as Note,
      { commonName: 'a', properName: 'A', value: 9, octave: 1 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });

  test('chord C(#5) on octave zero has notes C_0, E_0, G♯_0.', async (): Promise<void> => {
    const root = new Note('C', 0);
    const { notes } = new GenericChord(root, { quality: 'Maj', alterations: [ '#5' ]});
    const expected = [
      { commonName: 'c', properName: 'C', value: 0, octave: 0 } as Note,
      { commonName: 'e', properName: 'E', value: 4, octave: 0 } as Note,
      { commonName: 'g#', properName: 'G♯', value: 8, octave: 0 } as Note
    ];

    assert.that(notes).is.equalTo(expected);
  });
});
