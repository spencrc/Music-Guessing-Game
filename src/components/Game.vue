<template>
  <NavBar />
  <ProgressDisplay />
  <GameContent />
</template>

<script setup lang="ts">
import ProgressDisplay from '@/components/ProgressDisplay.vue'
import NavBar from '@/components/NavBar.vue'
import GameContent from '@/components/GameContent.vue'
import { useGameStore } from '@/stores/game'
import { onBeforeUnmount } from 'vue'

const gameStore = useGameStore()

const props = defineProps<{
  day: number
}>()

gameStore.setDay(props.day)

onBeforeUnmount(() => {
  gameStore.reset()
})
</script>
