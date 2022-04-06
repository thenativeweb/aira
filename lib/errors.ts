import { defekt } from 'defekt';

class MidiValueOutOfRange extends defekt({ code: 'MidiValueOutOfRange' }) {}
class OperationInvalid extends defekt({ code: 'OperationInvalid' }) {}
class PatternLengthInvalid extends defekt({ code: 'PatternLengthInvalid' }) {}
class PercentOutOfRange extends defekt({ code: 'PercentOutOfRange' }) {}

export {
  MidiValueOutOfRange,
  OperationInvalid,
  PatternLengthInvalid,
  PercentOutOfRange
};
