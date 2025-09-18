export interface HistoryRow {
    day: Date,
    [key: `song_${number}`]: string,
    [key: `clue_${number}_start`]: number
}