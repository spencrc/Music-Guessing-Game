import type { Config } from '@netlify/functions'
import databaseClient from '../../backend/database/databaseClient.ts'
import songs from '../../backend/songs.ts'
import { HistoryRow } from '../../backend/types.ts'

const randomInteger = (min: number, max: number): number => {
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default async (req: Request) => {
  const songNames = Object.keys(songs)
  const pickedSongs = songNames.sort(() => Math.random() - 0.5).slice(0, 5)
  const values = { day: new Date() } as HistoryRow

  let clueCount = 1
  for (let i = 0; i < pickedSongs.length; i++) {
    const name = pickedSongs[i]
    const duration = songs[name].d

    values[`song_${i + 1}`] = name

    for (let j = 0; j < 2; j++) {
      const start = randomInteger(0.1 * duration, 0.9 * duration)
      values[`clue_${clueCount++}_start`] = start
    }
  }

  const { data, error } = await databaseClient.from('history').insert([values])

  if (error) {
    console.error('Database error:', error)
  } else {
    console.log(
      'Completed daily update! A new row of songs and clues has been added to the database',
    )
  }
}

export const config: Config = {
  schedule: '@daily',
}
