<template>
  <div id="game-links">
    <router-link to="/archive">ARCHIVE</router-link>
    <p>DAY #000</p>
    <router-link to="/">HELP</router-link>
  </div>
  <div id="progress">
    <p><u>1</u></p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
  </div>
  <div class="container" v-show="!playerLoading">
    <ClueCard
      v-for="(clue, index) in clues"
      :key="index"
      :label="clue.label"
      :time="clue.time"
      :startingTime="index === 2 ? 0 : startingTimes[round * 3 + index]"
      :correctGuess="songsNames[round]"
      :class="{ disabled: gameStore.currentClue < index }"
    />
    <YouTubePlayer v-if="songIds[round]" :id="songIds[round]" />
  </div>
</template>

<script setup lang="ts">
import { clues } from '../../config.json'
import ClueCard from '@/components/ClueCard.vue'
import YouTubePlayer from '@/components/YouTubePlayer.vue'
import { onMounted, ref, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useGameStore } from '@/stores/game'

const playerStore = usePlayerStore()
const gameStore = useGameStore()

const songsNames = ref(new Array<string>())
const songIds = ref(new Array<string>())
const startingTimes = ref(new Array<number>())
const playerLoading = ref(true)
const round = ref(0)

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

    watch(
      () => playerStore.isLoading,
      () => {
        playerLoading.value = false
      },
    )
  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
#progress {
  width: 20rem;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}

#game-links {
  width: 28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.disabled {
  pointer-events: none;
  opacity: 50%;
}
</style>
