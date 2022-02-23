import { MidiValue } from '../../midi/MidiValue';

type Numerator = number;
type Denominator = number;
type Modifier = '' | '.' | 't';

type Duration = `${Numerator}/${Denominator}${Modifier}`;

interface NoteStep {
  type: 'note';
  noteValue: MidiValue;
  velocity: MidiValue;
  duration: Duration;
}

export {
  NoteStep
};
