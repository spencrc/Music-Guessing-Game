<script setup lang="ts">
import { CLUES } from '@/config'
import ClueCard from '@/components/ClueCard.vue'
import YouTubePlayer from '@/components/YouTubePlayer.vue'
</script>

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
  <ClueCard v-for="(clue, index) in CLUES" :key="index" :label="clue.label" :time="clue.time" :id="index + 1" />
  <YouTubePlayer />
</template>

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
</style>
