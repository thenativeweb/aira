import { Chord } from './Chord';
import { Note } from './Note';
import { ChordAddition, ChordAlteration, ChordExtension } from './ChordConfiguration';

const chordAdditionProperSymbolMap: Record<string | number, ChordAddition> = {
  '♭2': '♭2',
  b2: '♭2',
  2: '2',
  4: '4',
  '♭6': '♭6',
  b6: '♭6',
  6: '6',
  '♭7': '♭7',
  b7: '♭7',
  7: '7',
  '♭9': '♭9',
  b9: '♭9',
  9: '9',
  '♯9': '♯9',
  '#9': '♯9',
  11: '11',
  '♯11': '♯11',
  '#11': '♯11',
  '♭13': '♭13',
  b13: '♭13',
  13: '13'
} as const;

const chordAlterationProperSymbolMap: Record<string | number, ChordAlteration> = {
  '♭5': '♭5',
  b5: '♭5',
  '♯5': '♯5',
  '#5': '♯5',
  '♭9': '♭9',
  b9: '♭9',
  '♯9': '♯9',
  '#9': '♯9',
  '♯11': '♯11',
  '#11': '♯11',
  '♭13': '♭13',
  b13: '♭13'
} as const;

const writeSortedIntervalString =
  (intervalStrings: string[], prefix?: string, joinWith?: string): string => {
    const prefixPart = prefix ?? '';
    const sortedIntervalStr =
      intervalStrings.sort(
        (intervalA: string, intervalB: string): number =>
          Number.parseInt(/\d\d?/u.exec(intervalA)?.join() ?? '0', 10) <=
          Number.parseInt(/\d\d?/u.exec(intervalB)?.join() ?? '0', 10) ?
            -1 :
            1
      ).join(joinWith);

    return `${prefixPart}${sortedIntervalStr}`;
  };

const writeChord = (chord: Chord): string => {
  const writeChordNote = (): string =>
    chord.root.properName ?? chord.root.commonName.toUpperCase();

  const writeChordQuality = (): string => {
    switch (chord.configuration.quality) {
      case 'min':
        return 'm';
      case 'halfDim':
        return 'ø';
      case 'Aug':
        return '+';
      case 'dim':
        return '°';
      case 'sus':
        return `sus${chord.configuration.suspension}`;
      case 'Power':
        return '5';
      case 'Dom':
      case 'Maj':
      default:
        return '';
    }
  };

  const writeChordSixthNinthPart = (): string => {
    const additionsArr = chord.configuration.additions ?? [];
    const extensionsArr = chord.configuration.extensions ?? [];

    if ((additionsArr.includes(6) || additionsArr.includes('6')) && !extensionsArr.includes(7)) {
      const withNine = additionsArr.includes(9) || additionsArr.includes('9') || extensionsArr.includes(9);

      return withNine ? '6/9' : '6';
    }

    return '';
  };

  const writeChordSeventhNinethEleventhThirteenthPart = (): string => {
    const extensionsArr = chord.configuration.extensions ?? [];
    const maxExtension = Math.max(0, ...extensionsArr);
    const seventhNinthEleventhThirteenthPart = maxExtension > 0 ? maxExtension.toString() : '';
    const majorExtensionPart = chord.configuration.quality === 'Maj' && maxExtension > 0 ? 'Maj' : '';

    return majorExtensionPart + seventhNinthEleventhThirteenthPart;
  };

  const writeChordAlterationsPart = (): string => {
    const alterationsArr = chord.configuration.alterations ?? [];
    const properlyNamedAlterationsArr =
      alterationsArr.map(
        (alt: ChordAlteration): ChordAlteration => chordAlterationProperSymbolMap[alt]
      );
    const alterationsString =
      alterationsArr.length > 0 ?
        writeSortedIntervalString(properlyNamedAlterationsArr) :
        '';

    return alterationsArr.length > 0 ?
      `(${alterationsString})` :
      '';
  };

  const writeChordAdditionsPart = (): string => {
    const additionsArr: ChordAddition[] = chord.configuration.additions ?? [];
    const extensionsArr: ChordExtension[] = chord.configuration.extensions ?? [];
    const chordNameHasSixthNinthPart: boolean = (additionsArr.includes(6) || additionsArr.includes('6')) && !extensionsArr.includes(7);
    const majorSeventhAddedOnMinor: boolean = chord.configuration.quality === 'min' && additionsArr.includes(7);

    // Map to proper UTF-8 Symbol usage, then
    // Remove 6 (and 9) if already written, then
    // Map major-7 on a minor chord to the string 'Maj7' to give 'minMaj7'
    // For being more common and explicit than 'min7+'
    const modifiedAdditionsArr: (ChordAddition | 'Maj7')[] =
      additionsArr.map(
        (add: ChordAddition): ChordAddition => chordAdditionProperSymbolMap[add.toString()]
      ).filter(
        (add: ChordAddition): boolean => !chordNameHasSixthNinthPart || (add !== '6' && add !== '9')
      ).map(
        (add: ChordAddition): ChordAddition | 'Maj7' => majorSeventhAddedOnMinor && add === '7' ? 'Maj7' : add
      );
    const additions = modifiedAdditionsArr.join(',');

    return additions.length > 0 ? `add${additions}` : '';
  };

  const writeChordOmissionsPart = (): string => {
    const omissionsArr = chord.configuration.omissions ?? [];
    const sortedIntervalString =
      writeSortedIntervalString(
        omissionsArr.map((ommission: number | string): string => ommission.toString()),
        'no',
        ',no'
      );

    return omissionsArr.length > 0 ?
      `(${sortedIntervalString})` :
      '';
  };

  const writeChordInversionPart = (): string => {
    const noteIdx = chord.configuration.droppedPositions?.length ?? 0;
    const note: Note | null = chord.notes.at(noteIdx) ?? null;
    const bottomNoteName =
      note?.properName ??
      note?.commonName ??
      '';

    return chord.configuration.inversion as number > 0 ? `/${bottomNoteName}` : '';
  };

  const writeChordDroppedVoicesPart = (): string => {
    const droppedVoicesArr = chord.configuration.droppedPositions ?? [];
    const joinedVoicesStr = droppedVoicesArr.join('-');

    return droppedVoicesArr.length > 0 ?
      `(drop-${joinedVoicesStr})` :
      '';
  };

  const [
    rootNotePart,
    qualityPart,
    sixthNinthPart,
    extensionPart,
    additionsPart,
    alterationsPart,
    omissionsPart,
    inversionPart,
    droppedVoicesPart
  ]: string[] = [
    writeChordNote(),
    writeChordQuality(),
    writeChordSixthNinthPart(),
    writeChordSeventhNinethEleventhThirteenthPart(),
    writeChordAdditionsPart(),
    writeChordAlterationsPart(),
    writeChordOmissionsPart(),
    writeChordInversionPart(),
    writeChordDroppedVoicesPart()
  ];

  return `${rootNotePart}${qualityPart}${sixthNinthPart}${extensionPart}${additionsPart}${alterationsPart}${omissionsPart}${inversionPart}${droppedVoicesPart}`;
};

export { writeChord };
