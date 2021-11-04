import { PlayNoteParameters } from '../midi/PlayNoteParameters';

interface PlayNoteBody {
  time: number;
  playNoteParameters: PlayNoteParameters;
}

export {
  PlayNoteBody
};
