import { Drumset } from './Drumset';
import { MidiValue } from '../../types/MidiValue';

interface Configuration {
  drumset?: Drumset;
  bassDrum?: {
    tune?: MidiValue;
    attack?: MidiValue;
    decay?: MidiValue;
    compressor?: MidiValue;
  };
  snareDrum?: {
    tune?: MidiValue;
    snappiness?: MidiValue;
    decay?: MidiValue;
    compressor?: MidiValue;
  };
  lowTom?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  midTom?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  highTom?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  rimShot?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  handClap?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  closedHihat?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  openHihat?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  crashCymbal?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
  rideCymbal?: {
    tune?: MidiValue;
    decay?: MidiValue;
  };
}

export { Configuration };
