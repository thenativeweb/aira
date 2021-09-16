import { defekt } from 'defekt';

class MidiValueOutOfRange extends defekt({ code: 'MidiValueOutOfRange' }) {}
class PatternLengthInvalid extends defekt({ code: 'PatternLengthInvalid' }) {}

export {
  MidiValueOutOfRange,
  PatternLengthInvalid
};
