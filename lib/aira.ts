import { Bar } from './music/elements/Bar';
import { createMultiNoteStep } from './music/patterns/createMultiNoteStep';
import { createNoteStep } from './music/patterns/createNoteStep';
import { createPattern } from './music/patterns/createPattern';
import { createPatterns } from './music/patterns/createPatterns';
import { createPlayer } from './music/player/createPlayer';
import { createRestStep } from './music/patterns/createRestStep';
import { crescendo } from './music/patterns/effects/crescendo';
import { getNoteValue } from './midi/getNoteValue';
import { getSynthesizersApi } from './http/getSynthesizersApi';
import { HttpSynthesizer } from './http/HttpSynthesizer';
import { LocalSynthesizer } from './midi/LocalSynthesizer';
import { MidiConnection } from './midi/MidiConnection';
import { MultiNoteStep } from './music/patterns/MultiNoteStep';
import { NoteStep } from './music/patterns/NoteStep';
import { RestStep } from './music/patterns/RestStep';
import { Score } from './music/arrangement/Score';
import { Song } from './music/arrangement/Song';
import { Step } from './music/patterns/Step';
import { Synthesizer } from './midi/Synthesizer';
import { tb3, tr8 } from './music/instruments';

export {
  Bar,
  createMultiNoteStep,
  createNoteStep,
  createPattern,
  createPatterns,
  createPlayer,
  createRestStep,
  crescendo,
  getNoteValue,
  getSynthesizersApi,
  HttpSynthesizer,
  LocalSynthesizer,
  MidiConnection,
  MultiNoteStep,
  NoteStep,
  RestStep,
  Score,
  Song,
  Step,
  Synthesizer,
  tb3,
  tr8
};
