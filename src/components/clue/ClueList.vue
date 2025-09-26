<template>
  <component
    v-for="(clue, index) in clues"
    :key="index"
    :is="resolveComponentType(index)"
    :label="clue.label"
    :time="clue.time"
    :startingTime="index === 2 ? 0 : startingTimes[gameStore.round * (num_clues_per_song - 1) + index]"
    :correctGuess="songNames[gameStore.round]"
    :class="{ disabled: gameStore.currentClue < index && !gameStore.isRoundOver }"
  />
</template>

<script setup lang="ts">
import { clues, num_clues_per_song } from '../../../config.json'
import { useGameStore } from '@/stores/game'
import ActiveClue from '@/components/clue/ActiveClue.vue'
import InactiveClue from '@/components/clue/InactiveClue.vue'

defineProps<{
  startingTimes: number[]
  songNames: string[]
}>()

const gameStore = useGameStore()

const resolveComponentType = (index: number) => {
  if (gameStore.currentClue < index && !gameStore.isRoundOver) return InactiveClue
  else return ActiveClue
}
</script>

<style>
.disabled {
  pointer-events: none;
  opacity: 50%;
}
</style>
