<template>
  <ClueCard
    v-for="(clue, index) in clues"
    :key="index"
    :label="clue.label"
    :time="clue.time"
    :startingTime="index === 2 ? 0 : startingTimes[gameStore.round * num_clues_per_song + index]"
    :correctGuess="songNames[gameStore.round]"
    :class="{ disabled: gameStore.currentClue < index }"
  />
</template>

<script setup lang="ts">
import { clues, num_clues_per_song } from '../../config.json'
import { useGameStore } from '@/stores/game'
import ClueCard from './ClueCard.vue'

defineProps<{
  startingTimes: number[]
  songNames: string[]
}>()

const gameStore = useGameStore()
</script>

<style>
.disabled {
  pointer-events: none;
  opacity: 50%;
}
</style>
