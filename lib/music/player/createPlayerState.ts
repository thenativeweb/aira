import { setTimeout } from 'timers/promises';

type State = 'playing' | 'stopping' | 'stopped';

const createPlayerState = function ({ initialState }: {
  initialState: State;
}) {
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

      while (true) {
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
