<template>
  <div id="game-links">
    <router-link to="/archive">ARCHIVE</router-link>
    <p>DAY #{{ String(gameStore.day).padStart(3, '0') }}</p>
    <router-link to="/">HELP</router-link>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

//const diffMs = new Date().getTime() - new Date(starting_date).getTime()

//const day = ref(String(Math.floor(diffMs / (1000 * 60 * 60 * 24))).padStart(3, '0'))
</script>

<style>
#game-links {
  width: 28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
