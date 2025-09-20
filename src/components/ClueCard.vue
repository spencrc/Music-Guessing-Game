<template>
  <div class="clue" :class="{ disabled: isDisabled }">
    <div class="progress-fill" :style="{ transform: `scaleX(${progress})`, opacity: opacity }"></div>
    <div class="features">
      <button class="play" @click="play">PLAY</button>
      <div class="input-frame" :class="{ wrong: isWrong, skipped: isSkipped, correct: isCorrect }">
        <input
          v-model="currentGuess"
          class="current-guess"
          placeholder="GUESS A SONG"
          autocomplete="off"
          name="{{id}}"
          :readOnly="hasGuessed"
          @input="onGuessChange"
        />
        <button class="submit" :hidden="hasGuessed" @click="submit">{{ buttonText }}</button>
      </div>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CLUES } from '@/config'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const props = defineProps<{
  label?: string
  time?: number
  id?: number
}>()

const videoId = ref('')
const startTime = ref(0)
const endDelay = ref(0)
const progress = ref(0)
const opacity = ref(0.3)

const skip = ref(true)
const currentGuess = ref('')
const buttonText = ref('SKIP')

const isDisabled = ref(false)
const hasGuessed = ref(false)
const isSkipped = ref(false)
const isWrong = ref(false)
const isCorrect = ref(false)

let raf: number | null = null

onMounted(() => {
  function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  endDelay.value = props.time || 0
  startTime.value = props.id === CLUES.length ? 0 : randomInteger(209 * 0.1, 209 * 0.9)
})

const play = () => {
  playerStore.setStartTime(startTime.value)
  playerStore.setEndDelay(endDelay.value)
  playerStore.togglePlaying()

  progress.value = 0
  opacity.value = 1
  if (raf) cancelAnimationFrame(raf) //code taken from https://github.com/VilleOlof/vyletponlde/blob/main/frontend/src/lib/AudioCard.svelte
  const duration = (props.time ?? 0) * 1000
  const start = performance.now()
  const tick = (time: number) => {
    const elapsed = time - start
    if (elapsed > duration) {
      progress.value = 1
      opacity.value = 1 - (elapsed - duration) / 300
      if (opacity.value <= 0) {
        opacity.value = 0
        return
      }
      raf = requestAnimationFrame(tick)
      return
    }
    progress.value = elapsed / duration
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

const submit = async () => {
  console.log('Guess:', currentGuess)
  hasGuessed.value = true
  if (skip.value) {
    isSkipped.value = true
    currentGuess.value = 'SKIPPED'
    return
  }

  try {
    const response = await fetch(`/api/days/0/songs/1/guesses?=${currentGuess.value}`)
    if (response) {
      isCorrect.value = true
      return
    }
  } catch (err) {
    console.error(err)
  } finally {
    isWrong.value = true
  }
}

const onGuessChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value.length !== 0) {
    buttonText.value = 'SUBMIT'
    skip.value = false
  } else {
    buttonText.value = 'SKIP'
    skip.value = true
  }
}
</script>

<style scoped>
.clue {
  position: relative;
  overflow: hidden;
  background-color: lightgreen;
  border-radius: 0.5rem;
  width: 22.5rem;
  display: flex;
  flex-flow: column;
  padding-top: 1.5rem;
  padding-bottom: 0.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.progress-fill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #bbf6bb;
  transform-origin: left center; /* super important! */
  z-index: 0;
}

.disabled {
  pointer-events: none;
  opacity: 50%;
}

.features {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.input-frame {
  border: 2px solid black;
  border-radius: 0.5rem;
  height: 2.25rem;
  flex: 1;
  display: flex;
  align-items: center;
}

.input-frame.skipped {
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.input-frame.wrong {
  background: rgba(255, 0, 0, 0.5);
  pointer-events: none;
}

.input-frame.correct {
  background: rgba(0, 255, 0, 0.5);
  pointer-events: none;
}

input {
  background: transparent;
  outline: none;
  width: 100%;
  border: 0px solid transparent;
  padding: 1rem;
  font-size: 1.25rem;
}

::placeholder {
  /* Edge 12 -18 */
  color: black;
  font-size: 1.25rem;
}

button {
  color: black;
  border: 0px solid transparent;
}

button.play {
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

button.play:hover {
  scale: 1.1;
}

button.submit {
  font-size: 1.25rem;
  border-radius: 0.5rem;
  margin: 0.25rem;
  padding: 0.25rem;
  background: rgba(0, 0, 0, 0.2);
}

button.submit:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
}

.label {
  align-self: end;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 700;
  z-index: 10;
}
</style>
