<template>
  <div id="progress">
    <p v-for="n in num_songs" :key="n">
      <u v-if="n === gameStore.round + 1">{{ n }}</u>
      <span v-else>{{ n }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { num_songs } from '../../config.json'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<style>
#progress {
  width: 20rem;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
