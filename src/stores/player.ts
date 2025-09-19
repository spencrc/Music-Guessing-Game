import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const playing = ref(false)
  const startTime = ref(0)
  const endDelay = ref(0)

  const togglePlaying = () => {
    playing.value = !playing.value
  }

  const setStartTime = (time: number) => {
    startTime.value = time
  }

  const setEndDelay = (delay: number) => {
    endDelay.value = delay
  }

  return { playing, startTime, endDelay, togglePlaying, setStartTime, setEndDelay }
})
