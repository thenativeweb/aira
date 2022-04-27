import { Bar } from './music/elements/Bar';
import { ControllerRecipe } from './music/elements/ControllerRecipe';
import { createControllerDescription } from './music/elements/createControllerDescription';
import { createNoteDescription } from './music/elements/createNoteDescription';
import { createPattern } from './music/patterns/createPattern';
import { createPatterns } from './music/patterns/createPatterns';
import { createPlayer } from './music/player/createPlayer';
import { createStep } from './music/patterns/createStep';
import { crescendo } from './music/patterns/effects/crescendo';
import { getSynthesizersApi } from './http/getSynthesizersApi';
import { HttpSynthesizer } from './http/HttpSynthesizer';
import { LocalSynthesizer } from './midi/LocalSynthesizer';
import { MidiConnection } from './midi/MidiConnection';
import { NoteRecipe } from './music/elements/NoteRecipe';
import { Score } from './music/arrangement/Score';
import { Song } from './music/arrangement/Song';
import { Step } from './music/patterns/Step';
import { Synthesizer } from './midi/Synthesizer';
import { tb3, tr8 } from './music/instruments';

export {
  Bar,
  ControllerRecipe,
  createControllerDescription,
  createNoteDescription,
  createPattern,
  createPatterns,
  createPlayer,
  createStep,
  crescendo,
  getSynthesizersApi,
  HttpSynthesizer,
  LocalSynthesizer,
  MidiConnection,
  NoteRecipe,
  Score,
  Song,
  Step,
  Synthesizer,
  tb3,
  tr8
};
