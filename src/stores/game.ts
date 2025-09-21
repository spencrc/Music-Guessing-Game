import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const round = ref(0)
  const currentClue = ref(0)
  const isRoundOver = ref(false)

  const incrementRound = () => {
    currentClue.value = 0
    round.value++
  }

  const incrementCurrentClue = () => {
    currentClue.value++
  }

  const finishRound = () => {
    isRoundOver.value = true
  }

  return { round, currentClue, incrementRound, incrementCurrentClue, finishRound }
})
