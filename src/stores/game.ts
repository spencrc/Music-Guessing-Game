import { defineStore } from 'pinia'
import { ref } from 'vue'
import { num_clues_per_song } from '../../config.json'

export const useGameStore = defineStore('game', () => {
  const round = ref(0)
  const currentClue = ref(0)
  const isRoundOver = ref(false)

  const incrementRound = () => {
    isRoundOver.value = false
    currentClue.value = 0
    round.value++
  }

  const incrementCurrentClue = () => {
    currentClue.value++
    if (currentClue.value >= num_clues_per_song) {
      isRoundOver.value = true
    }
  }

  const finishRound = () => {
    isRoundOver.value = true
  }

  const reset = () => {
    isRoundOver.value = false
    round.value = 0
    currentClue.value = 0
  }

  return { round, currentClue, isRoundOver, incrementRound, incrementCurrentClue, finishRound, reset }
})
