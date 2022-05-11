import { defekt } from 'defekt';

class MidiValueOutOfRange extends defekt({ code: 'MidiValueOutOfRange' }) {}
class OperationInvalid extends defekt({ code: 'OperationInvalid' }) {}
class PatternLengthInvalid extends defekt({ code: 'PatternLengthInvalid' }) {}
class PercentOutOfRange extends defekt({ code: 'PercentOutOfRange' }) {}
class NoteNameInvalid extends defekt({ code: 'NoteNameInvalid'}) {}
class OctaveOutOfRange extends defekt({ code: 'OctaveOutOfRange' }) {}
class EnharmonicallyIncompatibleNoteName extends defekt({ code: 'EnharmonicallyIncompatibleNoteName'}) {}

export {
  MidiValueOutOfRange,
  OperationInvalid,
  PatternLengthInvalid,
  PercentOutOfRange,
  NoteNameInvalid,
  OctaveOutOfRange,
  EnharmonicallyIncompatibleNoteName
};
