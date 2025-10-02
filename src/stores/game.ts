import { defineStore } from 'pinia'
import { ref } from 'vue'
import { num_clues_per_song, num_songs } from '../../config.json'

export const useGameStore = defineStore('game', () => {
  const round = ref(0)
  const currentClue = ref(0)
  const isRoundOver = ref(false)
  const isGameOver = ref(false)
  const day = ref(0)
  const score = ref(new Array<number>(num_songs))

  const incrementRound = () => {
    isRoundOver.value = false
    currentClue.value = 0
    round.value++
  }

  const finishRound = () => {
    isRoundOver.value = true
    score.value[round.value] = num_clues_per_song - currentClue.value
  }

  const incrementCurrentClue = () => {
    currentClue.value++
    if (currentClue.value >= num_clues_per_song) {
      finishRound()
    }
  }

  const reset = () => {
    isRoundOver.value = false
    isGameOver.value = false
    round.value = 0
    currentClue.value = 0
    score.value = new Array<number>(num_songs)
  }

  const setDay = (newDay: number) => {
    day.value = newDay
  }

  return {
    round,
    currentClue,
    isRoundOver,
    isGameOver,
    day,
    score,
    incrementRound,
    incrementCurrentClue,
    finishRound,
    reset,
    setDay,
  }
})
