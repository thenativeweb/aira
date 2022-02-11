import { MidiValue } from '../../midi/MidiValue';

interface ReleaseStep {
  type: 'release';
  noteValue: MidiValue;
  velocity: MidiValue;
}

export {
  ReleaseStep
};
