enum CommonNoteDesignator {
    'c' = 0, 'c#' = 1,
    'd' = 2, 'd#' = 3,
    'e' = 4,
    'f' = 5, 'f#' = 6,
    'g' = 7, 'g#' = 8,
    'a' = 9, 'a#' = 10,
    'b' = 11
}


type CommonNoteName = keyof typeof CommonNoteDesignator;

export { CommonNoteName, CommonNoteDesignator };