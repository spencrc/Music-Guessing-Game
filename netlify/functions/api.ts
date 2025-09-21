import express from 'express'
import serverless from 'serverless-http'
import songs from '../../backend/songs.ts'
import { getHistoryByDay } from '../../backend/database/history.ts'

const api = express()

const NUM_SONGS = 5
const NUM_CLUES = NUM_SONGS * 2

const songsSelectArgument = Array.from({ length: NUM_SONGS }, (_, i) => `song_${i + 1}`)
const cluesSelectArgument = Array.from({ length: NUM_CLUES }, (_, i) => `clue_${i + 1}_start`)
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

    for (let i = 1; i <= NUM_SONGS; i++) {
      const name = data[`song_${i}`]
      const id = songs[name].id
      dailySongs.push({ name, id })
    }

    for (let i = 1; i <= NUM_CLUES; i++) {
      dailyClues.push(data[`clue_${i}_start`])
    }

    res.send({ dailySongs, dailyClues })
  } catch (err) {
    console.error(`Error fetching history row for day ${day}! ${err}`)
    return res.status(500).send('Internal server error')
  }
})

export const handler = serverless(api)
