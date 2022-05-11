import { createPatterns, createStep, NoteStep, Chord, parseChord, createChord } from '../../../lib/aira';
import { mapValues } from 'lodash';

/* eslint-disable @typescript-eslint/naming-convention */
const _ = createStep();

type UsedChordNames = 'Amin' | 'Dmin' | 'Emin' | 'F';

const chordNames: Record<UsedChordNames, string> = {
  Amin: 'A_3min/E(drop-2)',
  Dmin: 'D_4min/F(drop-2)',
  Emin: 'E_4min/G(drop-2)',
  F:    'F_4/A(drop-2)'
};
const chordInstances: Record<UsedChordNames, Chord> = mapValues(chordNames, parseChord);

//Alternatively
/*
const chordInstances: Record<UsedChordNames, Chord> = {
  Amin: createChord('A_3', {quality: 'min', inversion: 2, droppedPositions: [2]}),
  Dmin: createChord('D_4', {quality: 'min', inversion: 1, droppedPositions: [2]}),
  Emin: createChord('E_4', {quality: 'min', inversion: 1, droppedPositions: [2]}),
  F:    createChord('F_4', {quality: 'Maj', inversion: 1, droppedPositions: [2]}),
}
*/

const chordNoteStepArrays: Record<UsedChordNames, NoteStep[]> = mapValues(chordInstances, (x: Chord) => x.getNoteSteps(127, '1/16'));

const Am = createStep(chordNoteStepArrays['Amin']);
const Dm = createStep(chordNoteStepArrays['Dmin']);
const Em = createStep(chordNoteStepArrays['Emin']);
const F =  createStep(chordNoteStepArrays['F']);

const chords = createPatterns({
  Am: [ Am, _, _, Am, _, _, Am, _, _, Am, _, _, Am, _, Am, _ ],
  Dm: [ Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, Dm, _ ],
  Em: [ Em, _, _, Em, _, _, Em, _, _, Em, _, _, Em, _, Em, _ ],
  Fd: [ F , _, _, F , _, _, F , _, _, F , _, _, F , _, F , _ ]
});
/* eslint-enable @typescript-eslint/naming-convention */

export { chords };
