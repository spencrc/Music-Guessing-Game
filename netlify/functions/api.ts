import express from 'express'
import serverless from 'serverless-http'
import songs from '../../backend/songs.ts'
import { getHistoryByDay } from '../../backend/database/history.ts'
import { num_songs, num_clues_per_song } from '../../config.json'

const api = express()

const num_clues = num_songs * (num_clues_per_song - 1)

const songsSelectArgument = Array.from({ length: num_songs }, (_, i) => `song_${i + 1}`)
const cluesSelectArgument = Array.from({ length: num_clues }, (_, i) => `clue_${i + 1}_start`)
const selectArguments = [...songsSelectArgument, ...cluesSelectArgument].join(', ')

api.get('/api/days/:day', async (req, res) => {
  const day = +req.params.day

  try {
    const data = await getHistoryByDay(day, selectArguments)
    if (!data) {
      return res.status(404).send('History row not found')
    }

    const dailySongs = new Array<{ name: string; id: string }>()
    const dailyClues = new Array<number>()

    for (let i = 1; i <= num_songs; i++) {
      const name = data[`song_${i}`]
      const id = songs[name].id
      dailySongs.push({ name, id })
    }

    for (let i = 1; i <= num_clues; i++) {
      dailyClues.push(data[`clue_${i}_start`])
    }

    res.send({ dailySongs, dailyClues })
  } catch (err) {
    console.error(`Error fetching history row for day ${day}! ${err}`)
    return res.status(500).send('Internal server error')
  }
})

export const handler = serverless(api)
