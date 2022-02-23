import { assert } from 'assertthat';
import { Duration } from '../../../../lib/music/elements/Duration';
import { translateDuration } from '../../../../lib/music/player/translateDuration';

suite('translateDuration()', () => {
    test('for 1/4 and BPM of 60, returns 1000', async (): Promise<void> => {
        const duration: Duration = '1/4';
        const bpm = 60;

        const result: number = translateDuration({ duration, bpm });

        assert.that(result).is.equalTo(1_000);
    });

    test('for 1/4 and BPM of 120, returns 500', async (): Promise<void> => {
        const duration: Duration = '1/4';
        const bpm = 120;

        const result: number = translateDuration({ duration, bpm });

        assert.that(result).is.equalTo(500);
    });

    test('for 1/8 and BPM of 60, returns 500', async (): Promise<void> => {
        const duration: Duration = '1/8';
        const bpm = 60;

        const result: number = translateDuration({ duration, bpm });

        assert.that(result).is.equalTo(500);
    });

    test('for 1/4 and BPM of 137, floors the result to 437', async (): Promise<void> => {
        const duration: Duration = '1/4';
        const bpm = 137;

        const result: number = translateDuration({ duration, bpm });

        assert.that(result).is.equalTo(437);
    });
});