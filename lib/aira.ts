import { Bar } from './music/elements/Bar';
import { createNoteStep } from './music/patterns/createNoteStep';
import { createPattern } from './music/patterns/createPattern';
import { createPatterns } from './music/patterns/createPatterns';
import { createRestStep } from './music/patterns/createRestStep';
import { crescendo } from './music/patterns/effects/crescendo';
import { getNoteValue } from './midi/getNoteValue';
import { getSynthesizersApi } from './http/getSynthesizersApi';
import { LocalSynthesizer } from './midi/LocalSynthesizer';
import { MidiConnection } from './midi/MidiConnection';
import { NoteStep } from './music/patterns/NoteStep';
import { RestStep } from './music/patterns/RestStep';
import { Song } from './music/arrangement/Song';
import { Step } from './music/patterns/Step';
import { Synthesizer } from './midi/Synthesizer';
import { tb3, tr8 } from './music/instruments';

export {
  Bar,
  createNoteStep,
  createPattern,
  createPatterns,
  createRestStep,
  crescendo,
  getNoteValue,
  getSynthesizersApi,
  LocalSynthesizer,
  MidiConnection,
  NoteStep,
  RestStep,
  Song,
  Step,
  Synthesizer,
  tb3,
  tr8
};
