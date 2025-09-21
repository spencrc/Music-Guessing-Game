import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const isLoading = ref(true)
  const playCount = ref(0)
  const startTime = ref(0)
  const endDelay = ref(0)

  const setLoadingState = (loading: boolean) => {
    isLoading.value = loading
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

  return { isLoading, playCount, startTime, endDelay, setLoadingState, incrementPlayCount, setStartTime, setEndDelay }
})
