import express, { Router } from 'express'
import serverless from 'serverless-http'
import songs from '../../backend/songs.ts'
import { getHistoryByDay, getSongName } from '../../backend/database/history.ts'

const api = express()

const router = Router()

router.get('/days/:day/songs/:song/id', async (req, res) => {
  const day = +req.params.day
  const song = +req.params.song

  try {
    const songName = await getSongName(day, song)
    const id = songs[songName].id
    res.send(id)
  } catch (err) {
    console.error(err)
    res.status(404).send('Song not found')
  }
})

router.get('/days/:day/songs/:song/info', async (req, res) => {
  const day = +req.params.day
  const song = +req.params.song

  try {
    const songName = await getSongName(day, song)
    res.send(songName)
  } catch (err) {
    console.error(err)
    res.status(404).send('Song not found')
  }
})

router.get('/days/:day/songs/:song/guesses', async (req, res) => {
  const day = +req.params.day
  const song = +req.params.song
  const guess = req.query.guess

  try {
    const songName = await getSongName(day, song)
    const isCorrect = guess === songName
    res.send(isCorrect)
  } catch (err) {
    console.error(err)
    res.status(404).send('Song not found')
  }
})

router.get('/days/:day/clues', async (req, res) => {
  const day = +req.params.day

  const selectArguments = `
        clue_1_start,
        clue_2_start,
        clue_3_start,
        clue_4_start,
        clue_5_start,
        clue_6_start,
        clue_7_start,
        clue_8_start,
        clue_9_start,
        clue_10_start
    `

  try {
    const data = await getHistoryByDay(day, selectArguments)
    res.send(data)
  } catch (err) {
    console.error(`No clues found for day ${day}! ${err}`)
    return res.status(404).send('Clues not found')
  }
})

api.use('/api', router)

export const handler = serverless(api)
