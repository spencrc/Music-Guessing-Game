<template>
  <NavBar v-if="!gameStore.isGameOver" />
  <ProgressDisplay v-if="!gameStore.isGameOver" />
  <GameContent v-if="!gameStore.isGameOver" />
  <Results v-else />
</template>

<script setup lang="ts">
import ProgressDisplay from '@/components/ProgressDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import GameContent from '@/components/GameContent.vue'
import { useGameStore } from '@/stores/game'
import { onBeforeUnmount } from 'vue'
import Results from './Results.vue'

const gameStore = useGameStore()

const props = defineProps<{
  day: number
}>()

gameStore.setDay(props.day)

onBeforeUnmount(() => {
  gameStore.reset()
})
</script>
