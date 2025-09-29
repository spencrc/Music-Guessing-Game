<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const numerator = gameStore.score.reduce((a, b) => a + b, 0)
const denominator = gameStore.score.length * 3
</script>

<template>
  <h2>YOUR RESULTS</h2>
  <p>POINTS: {{ numerator }}/{{ denominator }}</p>
  <router-link to="/archive">(PLAY PAST GAMES)</router-link>
</template>
