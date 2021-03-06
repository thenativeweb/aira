import { handleStep } from './handleStep';
import { Metronome } from '../elements/Metronome';
import { ppqn } from './ppqn';
import { Score } from '../arrangement/Score';
import { Signature } from '../elements/Signature';
import { Stop } from './Stop';

const loop = async function ({ score, metronome, signature, stop, bpm }: {
  score: Score;
  metronome: Metronome;
  signature: Signature;
  stop: Stop;
  bpm: number;
}): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  for await (const _ of metronome) {
    const position = signature.handlePulse();
    const bar = score.bars[position.bar];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!bar) {
      await stop();
      break;
    }

    for (const [ trackIndex, pattern ] of bar.entries()) {
      const track = Object.values(score.tracks)[trackIndex];

      if (track.mute) {
        continue;
      }

      const step = pattern[(position.beat * ppqn) + position.pulse];

      handleStep({ step, track, bpm });
    }
  }
};

export { loop };
