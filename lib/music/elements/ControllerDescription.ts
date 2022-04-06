import { MidiValue } from '../../midi/MidiValue';

interface ControllerDescription {
  controller: MidiValue;
  value: MidiValue;
}

const isControllerDescription = function (candidate: any): candidate is ControllerDescription {
  return (
    candidate.controller !== undefined &&
    candidate.value !== undefined
  );
};

export {
  ControllerDescription,
  isControllerDescription
};
