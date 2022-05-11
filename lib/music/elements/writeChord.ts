import { Chord } from './Chord';
import { ChordAddition } from './ChordConfiguration';
import { ChordAlteration } from './ChordConfiguration';
import { ChordExtension } from './ChordConfiguration';


const chordAdditionProperSymbolMap: Record<(string|number),ChordAddition> = {
   '♭2' : '♭2',
   'b2' : '♭2',
    '2' :  '2',
    '4' :  '4',
   '♭6' : '♭6',
   'b6' : '♭6',
    '6' : '6',
   '♭7' : '♭7',
   'b7' : '♭7',
    '7' : '7',
   '♭9' : '♭9',
   'b9' : '♭9',
    '9' : '9',
   '♯9' : '♯9',
   '#9' : '♯9',
    '11': '11',
   '♯11': '♯11',
   '#11': '♯11', 
   '♭13': '♭13',
   'b13': '♭13',
    '13': '13'
} as const;

const chordAlterationProperSymbolMap: {[key: string]: ChordAlteration} = {
    '♭5' : '♭5',
    'b5' : '♭5',
    '♯5' : '♯5',
    '#5' : '♯5',
    '♭9' : '♭9',
    'b9' : '♭9',
    '♯9' : '♯9',
    '#9' : '♯9',
    '♯11': '♯11',
    '#11': '♯11',
    '♭13': '♭13',
    'b13': '♭13'
} as const;

const writeChord = (chord: Chord): string => {

    const writeChordNote = (chord: Chord): string => {
      return chord.root.properName ?? chord.root.commonName.toUpperCase();
    }
  
    const writeChordQuality = (chord: Chord): string => {
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
            return 'sus' + chord.configuration.suspension;
          case 'Power':
            return '5';
          case 'Dom':
          case 'Maj':
          default: 
            return '';
        }
    }
  
    const writeChordSixthNinthPart = (chord: Chord): string => {
      const additionsArr = chord.configuration.additions ?? [];
      const extensionsArr = chord.configuration.extensions ?? [];
      if ((additionsArr.includes(6) || additionsArr.includes('6')) && !(extensionsArr.includes(7))) {
          const withNine = (additionsArr.includes(9) || additionsArr.includes('9') || extensionsArr.includes(9));
          return withNine ? '6/9' : '6';
      }
      return '';
    }
  
    const writeChordSeventhNinethEleventhThirteenthPart = (chord:Chord): string => {
      const extensionsArr = chord.configuration.extensions ?? [];
      const maxExtension = Math.max(0, ...extensionsArr);
      const seventhNinthEleventhThirteenthPart =  (maxExtension > 0) ? maxExtension.toString() : '';
      const majorExtensionPart = (chord.configuration.quality === 'Maj' && maxExtension > 0) ? 'Maj' : '';
      return majorExtensionPart + seventhNinthEleventhThirteenthPart;
    }
  
    const writeChordAlterationsPart = (chord: Chord): string => {
      const alterationsArr = chord.configuration.alterations ?? [];
      const properlyNamedAlterationsArr = alterationsArr.map((a: ChordAlteration): ChordAlteration => chordAlterationProperSymbolMap[a]);
      const alterationsString =  
        (alterationsArr.length) ? 
          writeSortedIntervalString(properlyNamedAlterationsArr) :
          '';
      return (alterationsArr.length) ? 
        '(' + alterationsString + ')' : 
        '';
    }
  
    const writeChordAdditionsPart = (chord: Chord): string => {
      const additionsArr: ChordAddition[] = chord.configuration.additions ?? [];
      const extensionsArr: ChordExtension[] = chord.configuration.extensions ?? [];
      const chordNameHasSixthNinthPart: boolean = (additionsArr.includes(6) || additionsArr.includes('6')) && !(extensionsArr.includes(7));
      const majorSeventhAddedOnMinor: boolean = (chord.configuration.quality === 'min' && additionsArr.includes(7));
      const modifiedAdditionsArr: Array<ChordAddition | 'Maj7'> = 
        additionsArr
        //Map to proper UTF-8 Symbol usage
        .map((a: ChordAddition): ChordAddition => chordAdditionProperSymbolMap[a.toString()]) 
        //Remove 6 (and 9) if already written
        .filter((a: ChordAddition): boolean => !chordNameHasSixthNinthPart || (a !== '6' && a !== '9')) 
        //Map major-7 on a minor chord to the string 'Maj7' to give 'minMaj7' [better distinguishable under suboptimal conditions than 'min7+'];
        .map((a: ChordAddition): ChordAddition | 'Maj7' => (majorSeventhAddedOnMinor && a === '7') ? 'Maj7' : a); 
      const additions = modifiedAdditionsArr.join(',');
      return additions.length ? 'add' + additions : '';
    }
  
    const writeChordOmissionsPart = (chord: Chord): string => {
      const omissionsArr = chord.configuration.omissions ?? [];
      return (omissionsArr.length) ?  
        '(' + 
        writeSortedIntervalString(
            omissionsArr.map((x:number|string) => x.toString()), 
            'no', 
            ',no'
        ) + 
        ')' : 
        '';
    }
  
    const writeChordInversionPart = (chord: Chord): string => {
      const noteIdx = chord.configuration.droppedPositions?.length ?? 0;
      const bottomNoteName = (chord.notes[noteIdx]?.properName ?? chord.notes[noteIdx]?.commonName ?? '');
      return (chord.configuration.inversion as number > 0) ? '/' + bottomNoteName : '';
    }
  
    const writeChordDroppedVoicesPart = (chord: Chord): string => {
      const droppedVoicesArr = chord.configuration.droppedPositions ?? [];
      return  (droppedVoicesArr.length) ?
        '(drop-' + droppedVoicesArr.join('-') + ')' :
        '';
    }
  
    const writeSortedIntervalString = (intervalStrings: string[], prefix?: string, joinWith?: string) => {
      return (prefix ?? '') + intervalStrings.sort(
        (a: string, b:string) => { 
          return parseInt(a.match(/\d\d?/)?.join() ?? '0') <= parseInt(b.match(/\d\d?/)?.join() ?? '0') ? -1 : 1
        }
      ).join(joinWith);
    }
  
    return writeChordNote(chord) + writeChordQuality(chord) + 
           writeChordSixthNinthPart(chord) + writeChordSeventhNinethEleventhThirteenthPart(chord) +
           writeChordAdditionsPart(chord) + writeChordAlterationsPart(chord) + writeChordOmissionsPart(chord) +
           writeChordInversionPart(chord) + writeChordDroppedVoicesPart(chord);
  }

export { writeChord };