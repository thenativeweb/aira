import { assert } from 'assertthat';
import { mapToNoteStep, NoteStepMappable } from '../../../../lib/music/patterns/mapToNoteStep';
import { Note } from '../../../../lib/music/elements/Note';
import { NoteStep } from '../../../../lib/music/patterns/NoteStep';

suite('mapToNoteStep', (): void => {

  test('given noteStep, mapToNoteStep will return the passed argument', async (): Promise<void> => {
    const note: Note = new Note('C',1);
    const noteStep: NoteStep = new NoteStep(note, 100, '1/8T');
    assert.that(mapToNoteStep(noteStep)).is.equalTo(noteStep);
  });

  
  test('given note, mapToNoteStep will return a noteStep with given Note and default velocity/duration', async (): Promise<void> => {
    const note: Note = new Note('C',1);
    const actualNoteStep: NoteStep = mapToNoteStep(note);
    const expectedNoteStep = new NoteStep(note, NoteStep.DEFAULT_VELOCITY, NoteStep.DEFAULT_DURATION);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given note-name, mapToNoteStep will return a noteStep with note at default octave for given name and default velocity/duration', async (): Promise<void> => {
    const noteName = 'd#';
    const expectedNote: Note = new Note(noteName, Note.DEFAULT_OCTAVE);
    const actualNoteStep: NoteStep = mapToNoteStep(noteName);
    const expectedNoteStep = new NoteStep(expectedNote, NoteStep.DEFAULT_VELOCITY, NoteStep.DEFAULT_DURATION);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given array of note-name, mapToNoteStep will return a noteStep with note at default octave for given name and default velocity/duration', async (): Promise<void> => {
    const noteName = 'd#';
    const expectedNote: Note = new Note(noteName, Note.DEFAULT_OCTAVE);
    const actualNoteStep: NoteStep = mapToNoteStep([noteName]);
    const expectedNoteStep = new NoteStep(expectedNote, NoteStep.DEFAULT_VELOCITY, NoteStep.DEFAULT_DURATION);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given array of note-name and octave, mapToNoteStep will return a noteStep with note at given octave for given name and default velocity/duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep([noteName, octave]);
    const expectedNoteStep = new NoteStep(expectedNote, NoteStep.DEFAULT_VELOCITY, NoteStep.DEFAULT_DURATION);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given array of note-name, octave and velocity, mapToNoteStep will return a noteStep with note at given octave for given name and with given velocity and default duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 90;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep([noteName, octave, velocity]);
    const expectedNoteStep = new NoteStep(expectedNote, velocity, NoteStep.DEFAULT_DURATION);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given array of note-name, octave, velocity and duration, mapToNoteStep will return a noteStep with note at given octave for given name and with given velocity and duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 90;
    const duration = '1/8D';
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep([noteName, octave, velocity, duration]);
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given object containing note-name, mapToNoteStep will return a noteStep with given note at default octave for given name and with default velocity and duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = Note.DEFAULT_OCTAVE;
    const velocity = NoteStep.DEFAULT_VELOCITY;
    const duration = NoteStep.DEFAULT_DURATION;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep({name: noteName});
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given object containing note-name and octave, mapToNoteStep will return a noteStep with given note at given octave for given name and with default velocity and duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = NoteStep.DEFAULT_VELOCITY;
    const duration = NoteStep.DEFAULT_DURATION;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep({name: noteName, octave: octave});
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given object containing note-name, octave and velocity, mapToNoteStep will return a noteStep with given note at given octave for given name and with given velocity and default duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 80;
    const duration = NoteStep.DEFAULT_DURATION;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep({name: noteName, octave: octave, velocity: velocity});
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given object containing note-name, octave, velocity and duration, mapToNoteStep will return a noteStep with given data', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 80;
    const duration = '1/4T';
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep({name: noteName, octave: octave, velocity: velocity, duration: duration});
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given object containing note, octave, velocity and duration, mapToNoteStep will return a noteStep with given data', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 80;
    const duration = '1/4T';
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep({note: expectedNote, velocity: velocity, duration: duration});
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given string containing note-name and octave separated by underscore, mapToNoteStep will return a noteStep containing a note with the given data and default velocity/duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = NoteStep.DEFAULT_VELOCITY;
    const duration = NoteStep.DEFAULT_DURATION;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep(noteName + '_' + octave as NoteStepMappable);
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  test('given string containing note-name, octave and velocity separated by underscore, mapToNoteStep will return a noteStep containing a note with the given data, the given velocity and default duration', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 75;
    const duration = NoteStep.DEFAULT_DURATION;
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep(noteName + '_' + octave + '_' + velocity as NoteStepMappable);
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

  
  test('given string containing note-name, octave, velocity and duration separated by underscore, mapToNoteStep will return a noteStep containing the given data', async (): Promise<void> => {
    const noteName = 'd#';
    const octave = 2;
    const velocity = 75;
    const duration = '5/8'
    const expectedNote: Note = new Note(noteName, octave);
    const actualNoteStep: NoteStep = mapToNoteStep(noteName + '_' + octave + '_' + velocity + '_' + duration as NoteStepMappable);
    const expectedNoteStep = new NoteStep(expectedNote, velocity, duration);
    assert.that(actualNoteStep).is.equalTo(expectedNoteStep);
  });

});
