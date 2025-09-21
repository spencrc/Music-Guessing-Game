<template>
  <div id="game-links">
    <router-link to="/archive">ARCHIVE</router-link>
    <p>DAY #{{ day }}</p>
    <router-link to="/">HELP</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { starting_date } from '../../config.json'

const diffMs = new Date().getTime() - new Date(starting_date).getTime()

const day = ref(String(Math.floor(diffMs / (1000 * 60 * 60 * 24))).padStart(3, '0'))
</script>

<style>
#game-links {
  width: 28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
