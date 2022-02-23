import { Duration } from '../elements/Duration';

const translateDuration = ({ duration, bpm }: {
    duration: Duration,
    bpm: number
}): number => {
    const [numerator, denominator] = duration.split('/');

    return Math.floor(
            (Number(numerator) / Number(denominator)) * 4 * (60_000 / bpm)
    );
}

export {
    translateDuration
};