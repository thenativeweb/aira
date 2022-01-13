import { assert } from 'assertthat';
import { createPosition } from '../../../../lib/music/elements/createPosition';
import { createSignature } from '../../../../lib/music/elements/createSignature';
import { Position } from '../../../../lib/music/elements/Position';
import { Signature } from '../../../../lib/music/elements/Signature';

const ppqn = 24;

const handlePulseTimes = function ({ signature, count }: {
  signature: Signature;
  count: number;
}): Position {
  let position: Position;

  for (let i = 0; i < count; i++) {
    position = signature.handlePulse();
  }

  return position!;
};

suite('createSignature', (): void => {
  test('handling the first pulse returns the zero position.', async (): Promise<void> => {
    const signature = createSignature({ ppqn });
    const position = handlePulseTimes({ signature, count: 1 });

    assert.that(position).is.equalTo(createPosition({
      bar: 0,
      beat: 0,
      pulse: 0
    }));
  });

  test('handling the second pulse returns an advanced position.', async (): Promise<void> => {
    const signature = createSignature({ ppqn });
    const position = handlePulseTimes({ signature, count: 2 });

    assert.that(position).is.equalTo(createPosition({
      bar: 0,
      beat: 0,
      pulse: 1
    }));
  });

  test('handling ppqn+1 pulses returns the next beat.', async (): Promise<void> => {
    const signature = createSignature({ ppqn });
    const position = handlePulseTimes({ signature, count: ppqn + 1 });

    assert.that(position).is.equalTo(createPosition({
      bar: 0,
      beat: 1,
      pulse: 0
    }));
  });

  test('handling pulses for four quarters returns the next bar.', async (): Promise<void> => {
    const signature = createSignature({ ppqn });
    const position = handlePulseTimes({ signature, count: (4 * ppqn) + 1 });

    assert.that(position).is.equalTo(createPosition({
      bar: 1,
      beat: 0,
      pulse: 0
    }));
  });
});
