import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const isLoading = ref(true)
  const playCount = ref(0)
  const startTime = ref(0)
  const endDelay = ref(0)

  const finishLoading = () => {
    isLoading.value = false
  }

  const incrementPlayCount = () => {
    playCount.value++
  }

  const setStartTime = (time: number) => {
    startTime.value = time
  }

  const setEndDelay = (delay: number) => {
    endDelay.value = delay
  }

  return { isLoading, playCount, startTime, endDelay, finishLoading, incrementPlayCount, setStartTime, setEndDelay }
})
