// value indicates the number of semitones the third is above the root
enum ChordQuality {
  'Maj' = 4,
  'min' = 3,
  'halfDim' = 3,
  'dim' = 3,
  'Aug' = 4,
  'sus' = 0,
  'Dom' = 4,
  'Power' = 0,
} ;

type ChordScalePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ChordExtension = 7 | 9 | 11 | 13;

type ChordSuspension = '' | 2 | 4;

type ChordAddition =  '♭2' | 'b2' | '2' | '4' | 4 | '♭6' | 'b6' | '6' | 6 | '♭7' | 'b7' | '7' | 7 | '♭9' | 'b9' | '9' | 9 | '♯9' | '#9' | '11' | 11 | '♯11' | '#11' | '♭13' | 'b13' | '13' | 13;

type ChordOmission = 1 | 5 | 7 | 9 | 11;

type ChordAlteration = '♭5' | 'b5' | '♯5' | '#5' | '♭9' | 'b9' | '♯9' | '#9' | '♯11' | '#11' | '♭13' | 'b13';

type ChordDroppedPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ChordInversion = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

class ChordConfiguration {
  public constructor(
    public readonly quality: keyof typeof ChordQuality,
    public readonly extensions?: ChordExtension[],
    public readonly additions?: ChordAddition[],
    public readonly suspension?: ChordSuspension,
    public readonly omissions?: ChordOmission[],
    public readonly alterations?: ChordAlteration[],
    public readonly inversion?: ChordInversion,
    public readonly droppedPositions?: ChordDroppedPosition[]
  ) {}
}

export { ChordQuality };
export { ChordScalePosition };
export { ChordExtension };
export { ChordSuspension };
export { ChordAddition };
export { ChordOmission };
export { ChordAlteration };
export { ChordDroppedPosition };
export { ChordInversion };
export { ChordConfiguration };