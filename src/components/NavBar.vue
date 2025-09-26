<template>
  <div id="game-links">
    <router-link to="/archive">ARCHIVE</router-link>
    <p>DAY #{{ String(gameStore.day).padStart(3, '0') }}</p>
    <button @click="open = true">HELP</button>
  </div>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        <p>HOW TO PLAY</p>
        <ul>
          <li>EVERY DAY HAS 5 SONGS TO GUESS. EACH SONG HAS 3 CLUES.</li>
          <li>CLICK THE PLAY BUTTON TO HEAR THE CLUE, THEN TYPE YOUR GUESS.</li>
          <li>IF YOU DON'T KNOW THE SONG, YOU CAN PRESS SKIP!</li>
          <li>GUESSES MUST MATCH THE SONG TITLE EXACTLY, BUT ARE CASE INSENSITIVE.</li>
        </ul>
        <button @click="open = false">(CLOSE)</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const gameStore = useGameStore()

const open = ref(false)
</script>

<style scoped>
#game-links {
  width: 28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.modal {
  padding-top: 15rem;
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: start;
}

.modal-content {
  width: 20%; /* take up ~20% of screen width */
  min-width: 300px; /* optional: prevent it from being too small on tiny screens */
  background: #e6e3e3;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

ul {
  padding-left: 1rem;
  list-style: outside;
}

li {
  margin: 0.5rem 0;
}

button {
  padding: 0px;
  text-align: right;
}
</style>
