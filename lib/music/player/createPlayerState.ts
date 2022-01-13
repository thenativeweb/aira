import { PlayerState } from './PlayerState';
import { setTimeout } from 'timers/promises';
import { State } from './State';

const createPlayerState = function ({ initialState }: {
  initialState: State;
}): PlayerState {
  let state: State = initialState;

  return {
    getState (): State {
      return state;
    },

    async requestPlay (): Promise<void> {
      state = 'playing';
    },

    async requestStop (): Promise<void> {
      state = 'stopping';

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        await setTimeout(100);

        // @ts-expect-error For the reason, see comment above.
        if (state === 'stopped') {
          break;
        }
      }
    },

    setStopped (): void {
      state = 'stopped';
    }
  };
};

export { createPlayerState };
