import { AnyNoteName } from './AnyNoteName';
import { Chord } from './Chord';
import { createChord } from './createChord';
import { createNote } from './createNote';
import { Note } from './Note';
import { Octave } from './Octave';
import {
  ChordAddition,
  ChordAlteration,
  ChordConfiguration,
  ChordDroppedPosition,
  ChordExtension,
  ChordInversion,
  ChordOmission,
  ChordQuality,
  ChordSuspension
} from './ChordConfiguration';

class ChordParsingError extends Error {}

const parseChord = (chordName: string): Chord => {
  const parseRootNote = (): [Note, RegExpMatchArray] => {
    // Non-modified version of each letter must come last to actually match modified notes
    const rootNoteNameMatch =
      /^(?:C𝄫|C♭|C♮|C♯|C𝄪|C|D𝄫|D♭|D♮|D♯|D𝄪|D|E𝄫|E♭|E♮|E♯|E𝄪|E|F𝄫|F♭|F♮|F♯|F𝄪|F|G𝄫|G♭|G♮|G♯|G𝄪|G|A𝄫|A♭|A♮|A♯|A𝄪|A|B𝄫|B♭|B♮|B♯|B𝄪|B|c#|c|d#|d|e|f#|f|g#|g|a#|a|b)(?:_-?\d)?/u.exec(chordName);

    if (rootNoteNameMatch === null) {
      throw new ChordParsingError(`Cannot parse root-note in chord-name ${chordName}.`);
    }

    const rootNoteNameOctave = rootNoteNameMatch[0].split('_');
    const rootNoteName = rootNoteNameOctave[0] as AnyNoteName;
    const parsedRootNoteOctave = Number.parseInt(rootNoteNameOctave[1], 10);
    const rootNoteOctave = (Number.isNaN(parsedRootNoteOctave) ? Note.DefaultOctave : parsedRootNoteOctave) as Octave;

    return [ createNote(rootNoteName, rootNoteOctave), rootNoteNameMatch ];
  };

  const parseQuality = (rootNoteNameMatch: RegExpMatchArray): [keyof typeof ChordQuality, string] => {
    const dominantQualityRegex = new RegExp(`^${rootNoteNameMatch}(?:7|9|11|13)`, 'u');
    const quality: [keyof typeof ChordQuality, string] =
      (chordName.match(dominantQualityRegex) !== null ? [ 'Dom', '' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}min`) ? [ 'min', 'min' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}m`) ? [ 'min', 'm' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}dim`) ? [ 'dim', 'dim' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}°`) ? [ 'dim', '°' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}halfDim`) ? [ 'halfDim', 'halfDim' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}ø`) ? [ 'halfDim', 'ø' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}Aug`) ? [ 'Aug', 'Aug' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}+`) ? [ 'Aug', '+' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}sus`) ? [ 'sus', 'sus' ] : null) ??
      (chordName.includes(`${rootNoteNameMatch}5`) ? [ 'Power', '5' ] : null) ??
      [ 'Maj', '' ];

    return quality;
  };

  const parseSuspension =
    (rootNoteNameMatch: RegExpMatchArray, quality: keyof typeof ChordQuality): ChordSuspension => {
      const suspensionCandidate = quality === 'sus' ?
        Number.parseInt(chordName.charAt(`${rootNoteNameMatch}sus`.length), 10) :
        null;

      if (suspensionCandidate !== null && (Number.isNaN(suspensionCandidate) || ![ 2, 4 ].includes(suspensionCandidate))) {
        throw new ChordParsingError(`Cannot parse suspension-note in chord-name ${chordName} - must be 2 or 4.`);
      }

      return (suspensionCandidate ?? '') as ChordSuspension;
    };

  const parseAdditions = (
    rootNoteNameMatch: RegExpMatchArray,
    quality: keyof typeof ChordQuality
  ): ChordAddition[] => {
    const additions: ChordAddition[] = [];

    if (chordName.includes(`${rootNoteNameMatch}6`) || chordName.includes(`${rootNoteNameMatch}${quality}6`)) {
      additions.push(6);
      if (chordName.includes(`${rootNoteNameMatch}6/9`) || chordName.includes(`${rootNoteNameMatch}${quality}6/9`)) {
        additions.push(9);
      }
    }

    const additionsMatches = chordName.match(/(?<=add).?\d\d?/ug);

    if ((additionsMatches ?? []).length > 0) {
      additions.push(...(additionsMatches ?? []) as ChordAddition[]);
    }

    return additions;
  };

  const parseExtensions = (
    rootNoteNameMatch: RegExpMatchArray,
    qualityMatch: string
  ): ChordExtension[] => {
    const extensions: ChordExtension[] = [];

    if (
      chordName.includes(`${rootNoteNameMatch}7`) ||
      chordName.includes(`${rootNoteNameMatch}maj7`) ||
      chordName.includes(`${rootNoteNameMatch}${qualityMatch}7`)
    ) {
      extensions.push(7);

      return extensions;
    }

    if (
      chordName.includes(`${rootNoteNameMatch}9`) ||
      chordName.includes(`${rootNoteNameMatch}maj9`) ||
      chordName.includes(`${rootNoteNameMatch}${qualityMatch}9`)
    ) {
      if (!chordName.includes('no7')) {
        extensions.push(7);
      }
      extensions.push(9);

      return extensions;
    }

    if (
      chordName.includes(`${rootNoteNameMatch}11`) ||
      chordName.includes(`${rootNoteNameMatch}maj11`) ||
      chordName.includes(`${rootNoteNameMatch}${qualityMatch}11`)
    ) {
      if (!chordName.includes('no7')) {
        extensions.push(7);
      }
      if (!chordName.includes('no9')) {
        extensions.push(9);
      }
      extensions.push(11);

      return extensions;
    }

    if (
      chordName.includes(`${rootNoteNameMatch}13`) ||
      chordName.includes(`${rootNoteNameMatch}maj13`) ||
      chordName.includes(`${rootNoteNameMatch}${qualityMatch}13`)
    ) {
      if (!chordName.includes('no7')) {
        extensions.push(7);
      }
      if (!chordName.includes('no9')) {
        extensions.push(9);
      }
      if (!chordName.includes('no11')) {
        extensions.push(11);
      }
      extensions.push(13);
    }

    return extensions;
  };

  const parseOmissions = (): ChordOmission[] => {
    // To get all matches in a single array (or null)
    /* eslint-disable-next-line prefer-regex-literals */
    const regex = new RegExp('no5|no7|no9|no11|no1', 'ug');
    const matches = chordName.match(regex);

    return matches?.map(
      (x: string): ChordOmission => Number.parseInt(x.slice(2), 10) as ChordOmission
    ) ?? [];
  };

  const parseAlterations = (): ChordAlteration[] => {
    const alterationsPart =
      /(?<!=add)\((?:(?:♭5|b5|#5|♯5|♭9|b9|#9|♯9|#11|♯11|♭13|b13)(?:(?:,)|(?:,\s))?)+\)/u.exec(chordName);

    if (alterationsPart !== null) {
      const alterationsString = alterationsPart[0];
      const alterations = alterationsString.match(/[^\d]\d\d?/ug) ?? [];

      return alterations as ChordAlteration[];
    }

    return [];
  };

  const parseInversionRootNoteName = (): AnyNoteName | undefined => {
    const inversionNoteNameMatches =
      /(?<=\/)(?:C𝄫|C♭|C|C♮|C♯|C𝄪|D𝄫|D♭|D|D♮|D♯|D𝄪|E𝄫|E♭|E|E♮|E♯|E𝄪|F𝄫|F♭|F|F♮|F♯|F𝄪|G𝄫|G♭|G|G♮|G♯|G𝄪|A𝄫|A♭|A|A♮|A♯|A𝄪|B𝄫|B♭|B|B♮|B♯|B𝄪|c|c#|d|d#|e|f|f#|g|g#|a|a#|b)/u.exec(chordName);

    return inversionNoteNameMatches === null ?
      undefined :
      inversionNoteNameMatches[0] as AnyNoteName;
  };

  const getInversionNumber = (
    chordBeforeInversion: Chord,
    newRootNoteName: AnyNoteName
  ): ChordInversion => {
    const noteNamesInChord = chordBeforeInversion.notes.map(
      (note: Note): (string | undefined)[] => [ note.commonName, note.properName ]
    );

    for (const [ index, namesArr ] of noteNamesInChord.entries()) {
      if ((namesArr[0] === newRootNoteName) || (namesArr[1] === newRootNoteName)) {
        return index as ChordInversion;
      }
    }

    return 0;
  };

  const parseDroppedVoices = (): ChordDroppedPosition[] => {
    const droppedVoicesMatches =
      (chordName.match(/(?<=drop-)\d\d?(?:-\d\d?)*/ug) ?? [ '0' ])[0].split('-').map(
        (droppedVoice: string): number => Number.parseInt(droppedVoice, 10)
      );

    return droppedVoicesMatches[0] === 0 ?
      [] :
      droppedVoicesMatches as ChordDroppedPosition[];
  };

  const [ rootNoteName, rootNoteNameMatch ] = parseRootNote();
  const [ quality, qualityMatch ] = parseQuality(rootNoteNameMatch);
  const parsedSuspension = parseSuspension(rootNoteNameMatch, quality);
  const parsedAdditions = parseAdditions(rootNoteNameMatch, quality);
  const parsedExtensions = parseExtensions(rootNoteNameMatch, qualityMatch);
  const parsedOmissions = parseOmissions();
  const parsedAlterations = parseAlterations();
  const inversionRootNoteName = parseInversionRootNoteName();
  const parsedDroppedPositions = parseDroppedVoices();

  const suspension = parsedSuspension !== '' ? parsedSuspension : undefined;
  const additions = parsedAdditions.length > 0 ? parsedAdditions : undefined;
  const extensions = parsedExtensions.length > 0 ? parsedExtensions : undefined;
  const omissions = parsedOmissions.length > 0 ? parsedOmissions : undefined;
  const alterations = parsedAlterations.length > 0 ? parsedAlterations : undefined;
  const droppedPositions = parsedDroppedPositions.length > 0 ? parsedDroppedPositions : undefined;

  const chordConfigWithoutInversionAndDroppedPositions: Record<string, any> = { quality };

  if (typeof suspension !== 'undefined') {
    chordConfigWithoutInversionAndDroppedPositions.suspension = suspension;
  }

  if (typeof additions !== 'undefined') {
    chordConfigWithoutInversionAndDroppedPositions.additions = additions;
  }

  if (typeof extensions !== 'undefined') {
    chordConfigWithoutInversionAndDroppedPositions.extensions = extensions;
  }

  if (typeof omissions !== 'undefined') {
    chordConfigWithoutInversionAndDroppedPositions.omissions = omissions;
  }

  if (typeof alterations !== 'undefined') {
    chordConfigWithoutInversionAndDroppedPositions.alterations = alterations;
  }

  const chordBeforeInversionAndDroppedVoicing = createChord(
    rootNoteName,
    chordConfigWithoutInversionAndDroppedPositions as ChordConfiguration
  );

  const inversionNumber =
    typeof inversionRootNoteName === 'undefined' ?
      undefined :
      getInversionNumber(chordBeforeInversionAndDroppedVoicing, inversionRootNoteName);

  const chordConfig: Record<string, any> = chordConfigWithoutInversionAndDroppedPositions;

  if (typeof inversionRootNoteName !== 'undefined') {
    chordConfig.inversion = inversionNumber;
  }

  if (typeof droppedPositions !== 'undefined') {
    chordConfig.droppedPositions = droppedPositions;
  }

  return typeof inversionNumber === 'undefined' && (droppedPositions ?? []).length === 0 ?
    chordBeforeInversionAndDroppedVoicing :
    createChord(
      rootNoteName,
      chordConfig as ChordConfiguration
    );
};

export { parseChord };
