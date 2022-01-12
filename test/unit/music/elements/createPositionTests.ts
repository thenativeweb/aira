import { assert } from 'assertthat';
import { createPosition } from '../../../../lib/music/elements/createPosition';
import { Position } from '../../../../lib/music/elements/Position';

suite('createPosition', (): void => {
  test('returns a position matching the given bar, beat, and pulse.', async (): Promise<void> => {
    const actualPosition = createPosition({ bar: 23, beat: 2, pulse: 12 });

    const expectedPosition: Position = {
      bar: 23,
      beat: 2,
      pulse: 12
    };

    assert.that(actualPosition).is.equalTo(expectedPosition);
  });
});
