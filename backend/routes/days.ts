import { Router } from "express";
import supabase from "../supabase.ts"
import { STARTING_DATE } from "../config.ts";
import songs from "../songs.ts"

export interface HistoryRow {
    day: string,
    [key: `song_${number}`]: string,
    [key: `clue_${number}_start`]: number
}

const getTargetDate = (day: number): Date => {
    const targetDate = new Date(STARTING_DATE)
    targetDate.setDate(targetDate.getDate() + day)
    return targetDate
}

const getSongName = async (day: number, song: number): Promise<string> => {
    const targetDate = getTargetDate(day)

    const { data, error } = await supabase
        .from('history')
        .select(`song_${song}`)
        .eq('day', targetDate.toISOString().split("T")[0])
        .single<HistoryRow>()
    if (error || !data) 
        throw new Error(`No song ${song} found for day ${day}! Supabase error: ${error.message}`)

    return data[`song_${song}`]
}

const router = Router()

router.get("/:day/songs/:song/id", async (req, res) => {
    const day = +req.params.day
    const song = +req.params.song

    try {
        const songName = await getSongName(day, song)
        const id = songs[songName].id
        res.send(id)
    } catch (err: any) {
        console.error(err.message)
        res.status(404).send("Song not found")
    }
})

router.get("/:day/songs/:song/info", async (req, res) => {
    const day = +req.params.day
    const song = +req.params.song

    try {
        const songName = await getSongName(day, song)
        res.send(songName)
    } catch (err: any) {
        console.error(err.message)
        res.status(404).send("Song not found")
    }
})

router.get("/:day/songs/:song/guesses", async (req, res) => {
    const day = +req.params.day
    const song = +req.params.song
    const guess = req.query.guess

    try {
        const songName = await getSongName(day, song)
        const isCorrect = guess === songName
        res.send(isCorrect)
    } catch (err: any) {
        console.error(err.message)
        res.status(404).send("Song not found")
    }
})

router.get("/:day/clues", async (req, res) => {
    const day = +req.params.day
    const targetDate = getTargetDate(day)

    const { data, error } = await supabase
        .from('history')
        .select(`
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
        `)
        .eq('day', targetDate.toISOString().split("T")[0])
        .single()

    if (error || !data) {
        console.error(`No clues found for day ${day}! Supabase error ${error.message}`)
        return res.status(404).send("Clues not found")
    }

    res.send(data)
})

export default router;