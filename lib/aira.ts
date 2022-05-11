import { Bar } from './music/elements/Bar';
import { createNoteStep } from './music/patterns/createNoteStep';
import { createPattern } from './music/patterns/createPattern';
import { createPatterns } from './music/patterns/createPatterns';
import { createPlayer } from './music/player/createPlayer';
import { createStep } from './music/patterns/createStep';
import { crescendo } from './music/patterns/effects/crescendo';
import { getSynthesizersApi } from './http/getSynthesizersApi';
import { HttpSynthesizer } from './http/HttpSynthesizer';
import { LocalSynthesizer } from './midi/LocalSynthesizer';
import { MidiConnection } from './midi/MidiConnection';
import { NoteStep } from './music/patterns/NoteStep';
import { NoteStepMappable } from './music/patterns/mapToNoteStep';
import { mapToNoteStep } from './music/patterns/mapToNoteStep';
import { Chord } from './music/elements/Chord';
import { GenericChord } from './music/elements/Chord';
import { parseChord } from './music/elements/parseChord';
import { createChord } from './music/elements/createChord';
import { Score } from './music/arrangement/Score';
import { Song } from './music/arrangement/Song';
import { Step } from './music/patterns/Step';
import { Synthesizer } from './midi/Synthesizer';
import { tb3, tr8 } from './music/instruments';

export {
  Bar,
  createNoteStep,
  createPattern,
  createPatterns,
  createPlayer,
  createStep,
  crescendo,
  getSynthesizersApi,
  HttpSynthesizer,
  LocalSynthesizer,
  MidiConnection,
  NoteStep,
  NoteStepMappable,
  mapToNoteStep,
  Chord,
  GenericChord,
  parseChord,
  createChord,
  Score,
  Song,
  Step,
  Synthesizer,
  tb3,
  tr8
};
