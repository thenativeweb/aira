import { defekt } from 'defekt';

class OperationInvalid extends defekt({ code: 'OperationInvalid' }) {}
class PatternLengthInvalid extends defekt({ code: 'PatternLengthInvalid' }) {}

export {
  OperationInvalid,
  PatternLengthInvalid
};
