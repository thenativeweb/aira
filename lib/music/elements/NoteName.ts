enum NoteDesignator {
  'C𝄫' = 10, 'C♭' = 11, 'C' = 0,  'C♮' = 0,  'C♯' = 1,  'C𝄪' = 2,
  'D𝄫' = 0,  'D♭' = 1,  'D' = 2,  'D♮' = 2,  'D♯' = 3,  'D𝄪' = 4,
  'E𝄫' = 2,  'E♭' = 3,  'E' = 4,  'E♮' = 4,  'E♯' = 5,  'E𝄪' = 6,
  'F𝄫' = 3,  'F♭' = 4,  'F' = 5,  'F♮' = 5,  'F♯' = 6,  'F𝄪' = 7,
  'G𝄫' = 5,  'G♭' = 6,  'G' = 7,  'G♮' = 7,  'G♯' = 8,  'G𝄪' = 9,
  'A𝄫' = 7,  'A♭' = 8,  'A' = 9,  'A♮' = 9,  'A♯' = 10, 'A𝄪' = 11,
  'B𝄫' = 9,  'B♭' = 10, 'B' = 11, 'B♮' = 11, 'B♯' = 0,  'B𝄪' = 1
}

type NoteName = keyof typeof NoteDesignator;

export { NoteDesignator, NoteName };
