import { mapValues } from 'lodash';
import { Chord, createPatterns, createStep, NoteStep, parseChord } from '../../../lib/aira';

/* eslint-disable @typescript-eslint/naming-convention */
const _ = createStep();

type UsedChordNames = 'Amin' | 'Dmin' | 'Emin' | 'FMaj';

const chordNames: Record<UsedChordNames, string> = {
  Amin: 'A_3min/E(drop-2)',
  Dmin: 'D_4min/F(drop-2)',
  Emin: 'E_4min/G(drop-2)',
  FMaj: 'F_4/A(drop-2)'
};
const chordInstances: Record<UsedChordNames, Chord> = mapValues(chordNames, parseChord);

// Alternatively

// const chordInstances: Record<UsedChordNames, Chord> = {
//   Amin: createChord('A_3', {quality: 'min', inversion: 2, droppedPositions: [2]}),
//   Dmin: createChord('D_4', {quality: 'min', inversion: 1, droppedPositions: [2]}),
//   Emin: createChord('E_4', {quality: 'min', inversion: 1, droppedPositions: [2]}),
//   F:    createChord('F_4', {quality: 'Maj', inversion: 1, droppedPositions: [2]}),
// }

const chordNoteStepArrays: Record<UsedChordNames, NoteStep[]> =
  mapValues(chordInstances, (x: Chord): NoteStep[] => x.getNoteSteps(127, '1/16'));

const Am = createStep(chordNoteStepArrays.Amin);
const Dm = createStep(chordNoteStepArrays.Dmin);
const Em = createStep(chordNoteStepArrays.Emin);
const FMaj = createStep(chordNoteStepArrays.FMaj);

const chords = createPatterns({
  Am: [ Am, _, _, Am, _, _, Am, _, _, Am, _, _, Am, _, Am, _ ],
  Dm: [ Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, _, Dm, _, Dm, _ ],
  Em: [ Em, _, _, Em, _, _, Em, _, _, Em, _, _, Em, _, Em, _ ],
  Fd: [ FMaj, _, _, FMaj, _, _, FMaj, _, _, FMaj, _, _, FMaj, _, FMaj, _ ]
});
/* eslint-enable @typescript-eslint/naming-convention */

export { chords };
