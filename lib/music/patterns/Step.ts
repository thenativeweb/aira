import { createRestStep } from './createRestStep';
import { NoteStep } from './NoteStep';
import { RestStep } from './RestStep';
import { ReleaseStep } from './ReleaseStep';

type Step = (NoteStep | RestStep | ReleaseStep) [];

export { Step };


const s: Step = []

s.push(createRestStep());

console.log(s)