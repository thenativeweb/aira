import { defekt } from 'defekt';

class MidiValueOutOfRange extends defekt({ code: 'MidiValueOutOfRange' }) {}
class PatternLengthInvalid extends defekt({ code: 'PatternLengthInvalid' }) {}
class PercentOutOfRange extends defekt({ code: 'PercentOutOfRange' }) {}

export {
  MidiValueOutOfRange,
  PatternLengthInvalid,
  PercentOutOfRange
};
