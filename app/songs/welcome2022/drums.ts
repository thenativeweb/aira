import {
  mapToNoteStep,
  createPatterns,
  createStep,
  crescendo,
  tr8
} from '../../../lib/aira';

/* eslint-disable id-length, @typescript-eslint/naming-convention */
const BD = createStep([mapToNoteStep({ note: tr8.bassDrum,    velocity: 127, duration: '1/16' })]);
const bd = createStep([mapToNoteStep({ note: tr8.bassDrum,    velocity: 40,  duration: '1/16' })]);
const SD = createStep([mapToNoteStep({ note: tr8.snareDrum,   velocity: 127, duration: '1/16' })]);
const sd = createStep([mapToNoteStep({ note: tr8.snareDrum,   velocity: 80,  duration: '1/16' })]);
const CH = createStep([mapToNoteStep({ note: tr8.closedHihat, velocity: 127, duration: '1/16' })]);
const ch = createStep([mapToNoteStep({ note: tr8.closedHihat, velocity: 40,  duration: '1/16' })]);
const CC = createStep([mapToNoteStep({ note: tr8.crashCymbal, velocity: 127, duration: '1/16' })]);
const _ = createStep();

const bassdrum = createPatterns({
  a: [ BD, _, _, _, BD, _, _, _, BD, _, _, _, BD, _, bd, _ ],
  b: [ BD, _, _, _, BD, _, _, _, BD, _, _, bd, BD, _, bd, bd ],
  c: [ BD, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});

const snaredrum = createPatterns({
  a: [ _, _, _, _, SD, _, _, _, _, _, _, _, SD, _, _, sd ],
  b: [ _, _, _, _, SD, _, _, _, _, sd, sd, sd, SD, _, SD, SD ],
  c: crescendo([
    SD, _, _, _, _, _, SD, _, SD, _, SD, _, SD, _, SD, _,
    SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD, SD
  ])
});

const closedHihat = createPatterns({
  a: [ _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch, _, ch, CH, ch ]
});

const crashCymbal = createPatterns({
  c: [ CC, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _ ]
});
/* eslint-enable id-length, @typescript-eslint/naming-convention */

export {
  bassdrum as bd,
  snaredrum as sd,
  closedHihat as ch,
  crashCymbal as cc
};
