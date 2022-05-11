import { Chord } from './Chord';
import { ChordConfiguration } from './ChordConfiguration';
import { createChord } from './createChord';
import { Note } from './Note';
import { AnyNoteName } from './AnyNoteName';
import { Octave } from './Octave';
import { createNote } from './createNote';
import { ChordQuality } from './ChordConfiguration';
import { ChordSuspension } from './ChordConfiguration';
import { ChordAddition } from './ChordConfiguration';
import { ChordExtension } from './ChordConfiguration';
import { ChordOmission } from './ChordConfiguration';
import { ChordAlteration } from './ChordConfiguration';
import { ChordInversion } from './ChordConfiguration';
import { ChordDroppedPosition } from './ChordConfiguration';


class ChordParsingError extends Error {}

const parseChord = (chordName: string): Chord => {
  const parseRootNote = (chordName: string): [Note, RegExpMatchArray]  => {
    // non-modified version of each letter must come last to actually match modified notes
    const rootNoteNameMatch = chordName.match(
      /^(?:C𝄫|C♭|C♮|C♯|C𝄪|C|D𝄫|D♭|D♮|D♯|D𝄪|D|E𝄫|E♭|E♮|E♯|E𝄪|E|F𝄫|F♭|F♮|F♯|F𝄪|F|G𝄫|G♭|G♮|G♯|G𝄪|G|A𝄫|A♭|A♮|A♯|A𝄪|A|B𝄫|B♭|B♮|B♯|B𝄪|B|c#|c|d#|d|e|f#|f|g#|g|a#|a|b)(?:_-?\d)?/
    );
    if (null === rootNoteNameMatch) {
      throw new ChordParsingError(`Cannot parse root-note in chord-name ${chordName}.`);
    }
    const rootNoteNameOctave = rootNoteNameMatch[0].split('_');
    const rootNoteName = rootNoteNameOctave[0] as AnyNoteName;
    const parsedRootNoteOctave = parseInt(rootNoteNameOctave[1]);
    const rootNoteOctave = (isNaN(parsedRootNoteOctave) ? Note.DEFAULT_OCTAVE : parsedRootNoteOctave) as Octave;
    return [createNote(rootNoteName, rootNoteOctave), rootNoteNameMatch]
  }

  const parseQuality = (chordName: string, rootNoteNameMatch: RegExpMatchArray): [keyof typeof ChordQuality, string] => {
    const dominantQualityRegex = new RegExp('^' + rootNoteNameMatch + '(?:7|9|11|13)');
    const quality: [keyof typeof ChordQuality, string] = 
      (chordName.match(dominantQualityRegex) !== null               ? ['Dom', ''] : null)            ??
      ((chordName.indexOf(rootNoteNameMatch + 'min') !== -1)        ? ['min', 'min'] : null)         ??
      ((chordName.indexOf(rootNoteNameMatch + 'm') !== -1)          ? ['min','m'] : null)            ??
      ((chordName.indexOf(rootNoteNameMatch + 'dim') !== -1)        ? ['dim', 'dim'] : null)         ??
      ((chordName.indexOf(rootNoteNameMatch + '°') !== -1)          ? ['dim','°'] : null)            ??
      ((chordName.indexOf(rootNoteNameMatch + 'halfDim') !== -1)    ? ['halfDim', 'halfDim'] : null) ??
      ((chordName.indexOf(rootNoteNameMatch + 'ø') !== -1)          ? ['halfDim','ø'] : null)        ??
      ((chordName.indexOf(rootNoteNameMatch + 'Aug') !== -1)        ? ['Aug', 'Aug'] : null)         ??
      ((chordName.indexOf(rootNoteNameMatch + '+') !== -1)          ? ['Aug','+'] : null)            ??
      ((chordName.indexOf(rootNoteNameMatch + 'sus') !== -1)        ? ['sus','sus'] : null)          ??
      ((chordName.indexOf(rootNoteNameMatch + '5') !== -1)          ? ['Power','5'] : null)          ??
                                                                      ['Maj', ''];

    return quality;
  }

  const parseSuspension = (
    chordName: string, 
    rootNoteNameMatch: RegExpMatchArray, 
    quality: keyof typeof ChordQuality
  ): ChordSuspension => {
    const suspensionCandidate = (quality === 'sus') ? parseInt(chordName.charAt((rootNoteNameMatch + 'sus').length)) : null;
    if (null !== suspensionCandidate && (isNaN(suspensionCandidate) || ![2,4].includes(suspensionCandidate))) {
      throw new ChordParsingError(`Cannot parse suspension-note in chord-name ${chordName} - must be 2 or 4.`);
    }
    return (suspensionCandidate ?? '') as ChordSuspension;
  }

  const parseAdditions = (
    chordName: string, 
    rootNoteNameMatch: RegExpMatchArray, 
    quality: keyof typeof ChordQuality
  ): ChordAddition[] => {
    const additions: ChordAddition[] = [];
    if (chordName.indexOf(rootNoteNameMatch + '6') !== -1 || chordName.indexOf(rootNoteNameMatch + quality + '6') !== -1) {
      additions.push(6);
      if ((chordName.indexOf(rootNoteNameMatch + '6/9') || chordName.indexOf(rootNoteNameMatch + quality + '6/9'))) {
        additions.push(9);
      }
    }
    const additionsMatches = chordName.match(/add(.?\d\d?)/g)?.map((x:string) => x.slice(3));
    if ((additionsMatches ?? []).length) {
      additions.push(...(additionsMatches as ChordAddition[] ?? []))
    }
    return additions;
  }

  const parseExtensions = ( 
    chordName: string, 
    rootNoteNameMatch: RegExpMatchArray,
    qualityMatch: string
  ): ChordExtension[] => {
    const extensions: ChordExtension[] = [];
    if (
      chordName.indexOf(rootNoteNameMatch + '7') !== -1 || 
      chordName.indexOf(rootNoteNameMatch + 'maj' + 7) !== -1|| 
      chordName.indexOf(rootNoteNameMatch + qualityMatch + 7) !== -1
    ) {
      extensions.push(7);
      return extensions;
    }
    
    if (
      chordName.indexOf(rootNoteNameMatch + '9') !== -1 || 
      chordName.indexOf(rootNoteNameMatch + 'maj' + 9) !== -1 || 
      chordName.indexOf(rootNoteNameMatch + qualityMatch + 9) !== -1
    ) {
      if (chordName.indexOf('no7') === -1) {
        extensions.push(7);
      }
      extensions.push(9);
      return extensions;
    } 
    
    if (
      chordName.indexOf(rootNoteNameMatch + '11') !== -1 || 
      chordName.indexOf(rootNoteNameMatch + 'maj' + 11) !== -1|| 
      chordName.indexOf(rootNoteNameMatch + qualityMatch + 11) !== -1
    ) {
      if (chordName.indexOf('no7') === -1) {
        extensions.push(7);
      }
      if (chordName.indexOf('no9') === -1) {
        extensions.push(9)
      }
      extensions.push(11);
      return extensions;
    } 
    
    if (
      chordName.indexOf(rootNoteNameMatch + '13') !== -1 || 
      chordName.indexOf(rootNoteNameMatch + 'maj' + 13) !== -1 || 
      chordName.indexOf(rootNoteNameMatch + qualityMatch + 13) !== -1
    ) {
      if (chordName.indexOf('no7') === -1) {
        extensions.push(7);
      }
      if (chordName.indexOf('no9') === -1) {
        extensions.push(9)
      }
      if (chordName.indexOf('no11') === -1) {
        extensions.push(11)
      }
      extensions.push(13);
    }
    return extensions;
  }

  
  const parseOmissions = (chordName: string): ChordOmission[] => {
    // 'no1' must come last to match 'no11' if it is present
    return (chordName.match(/no5|no7|no9|no11|no1/g)?.map((x:string) => parseInt(x.slice(2)) as ChordOmission)) ?? [];
  }

  const parseAlterations = (chordName: string): ChordAlteration[] => {
    const alterationsPart = chordName.match(/(?<=\()(?:(?<!add)(?:♭5|b5|#5|♯5|♭9|b9|#9|♯9|#11|♯11|♭13|b13)+(?=\)))/);
    if (null !== alterationsPart) {
        const alterationsString = alterationsPart[0];
        return alterationsString.match(/[^\d]\d\d?/g) as ChordAlteration[];
    }
    return [];
  }

  const parseInversionRootNoteName = (chordName: string): AnyNoteName | undefined => {
    const inversionNoteNameMatches = 
      chordName.match(
        /(?<=\/)(?:C𝄫|C♭|C|C♮|C♯|C𝄪|D𝄫|D♭|D|D♮|D♯|D𝄪|E𝄫|E♭|E|E♮|E♯|E𝄪|F𝄫|F♭|F|F♮|F♯|F𝄪|G𝄫|G♭|G|G♮|G♯|G𝄪|A𝄫|A♭|A|A♮|A♯|A𝄪|B𝄫|B♭|B|B♮|B♯|B𝄪|c|c#|d|d#|e|f|f#|g|g#|a|a#|b)/
      );
    return (null === inversionNoteNameMatches) ? 
      undefined : 
      (inversionNoteNameMatches[0]  as AnyNoteName);
  }

  const getInversionNumber = (
    chordBeforeInversion: Chord, 
    newRootNoteName: AnyNoteName
  ): ChordInversion => {
    const noteNamesInChord = chordBeforeInversion.notes.map((x:Note) => [x.commonName, x.properName]);
    for (const [index, namesArr] of noteNamesInChord.entries()) {
      if ((namesArr[0] === newRootNoteName) || (namesArr[1] === newRootNoteName)) {
        return index as ChordInversion;
      }
    }
    return 0;
  }

  
  const parseDroppedVoices = (chordName: string): ChordDroppedPosition[] => {
    const droppedVoicesMatches = 
      (chordName.match(/(?<=drop-)\d\d?(?:-\d\d?)*/g) ?? ['0'])[0]
      .split('-')
      .map((x:string) => parseInt(x));
    
      return (droppedVoicesMatches === null || droppedVoicesMatches[0] === 0) ?
      [] : 
      droppedVoicesMatches as ChordDroppedPosition[];
  }

  const [rootNoteName, rootNoteNameMatch] = parseRootNote(chordName);
  const [quality, qualityMatch] = parseQuality(chordName, rootNoteNameMatch);
  const parsedSuspension = parseSuspension(chordName, rootNoteNameMatch, quality);
  const parsedAdditions = parseAdditions(chordName, rootNoteNameMatch, quality);
  const parsedExtensions = parseExtensions(chordName, rootNoteNameMatch, qualityMatch);
  const parsedOmissions = parseOmissions(chordName);
  const parsedAlterations = parseAlterations(chordName);
  const inversionRootNoteName = parseInversionRootNoteName(chordName);
  const parsedDroppedPositions = parseDroppedVoices(chordName);


  const suspension       = (parsedSuspension       !== '') ? parsedSuspension  : undefined;
  const additions        = (parsedAdditions.length)        ? parsedAdditions   : undefined;
  const extensions       = (parsedExtensions.length)       ? parsedExtensions  : undefined;
  const omissions        = (parsedOmissions.length)        ? parsedOmissions   : undefined;
  const alterations      = (parsedAlterations.length)      ? parsedAlterations : undefined;
  const droppedPositions = (parsedDroppedPositions.length) ? parsedDroppedPositions : undefined;

  const chordConfigWithoutInversionAndDroppedPositions: {[prop: string]: any} = { quality: quality };

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
  )
  const inversionNumber = 
    (typeof inversionRootNoteName === 'undefined') ?
      undefined :
      getInversionNumber(chordBeforeInversionAndDroppedVoicing, inversionRootNoteName);

  const chordConfig:  {[prop: string]: any} = chordConfigWithoutInversionAndDroppedPositions;
  if (typeof inversionRootNoteName !== 'undefined') {
    chordConfig.inversion = inversionNumber;
  }
  if (typeof droppedPositions !== 'undefined') {
    chordConfig.droppedPositions = droppedPositions;
  }

  return (typeof inversionNumber === 'undefined' && !(droppedPositions ?? []).length) ?
    chordBeforeInversionAndDroppedVoicing :
    createChord(
        rootNoteName,
        chordConfig as ChordConfiguration
    );
}

  export { parseChord }