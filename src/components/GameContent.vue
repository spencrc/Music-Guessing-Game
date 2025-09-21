<template>
  <div class="container">
    <ClueList v-if="!playerStore.isLoading" :startingTimes="startingTimes" :songNames="songsNames" />
    <YouTubePlayer v-if="songIds[gameStore.round]" :id="songIds[gameStore.round]" />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { onMounted, ref } from 'vue'
import { usePlayerStore } from '@/stores/player'
import ClueList from './ClueList.vue'
import YouTubePlayer from '@/components/YouTubePlayer.vue'

const playerStore = usePlayerStore()
const gameStore = useGameStore()

const songsNames = ref(new Array<string>())
const songIds = ref(new Array<string>())
const startingTimes = ref(new Array<number>())

interface Song {
  name: string
  id: string
}

onMounted(async () => {
  try {
    const response = await fetch('/api/days/0')
    const data = await response.json()

    songsNames.value = data.dailySongs.map((song: Song) => song.name)
    songIds.value = data.dailySongs.map((song: Song) => song.id)
    startingTimes.value = data.dailyClues
  } catch (err) {
    console.error(err)
  }
})
</script>
