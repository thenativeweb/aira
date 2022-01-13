import { State } from './State';

interface PlayerState {
  getState: () => State;
  requestPlay: () => Promise<void>;
  requestStop: () => Promise<void>;
  setStopped: () => void;
}

export { PlayerState };
