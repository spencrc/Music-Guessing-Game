<template>
  <div class="clue">
    <div class="progress-fill" :style="{ transform: `scaleX(${progress})`, opacity: opacity }"></div>
    <div class="features">
      <button class="play" @click="play">PLAY</button>
      <div class="input-frame" :class="{ wrong: isWrong, guessed: hasGuessed, correct: isCorrect }">
        <input
          v-model="currentGuess"
          class="current-guess"
          placeholder="GUESS A SONG"
          autocomplete="off"
          :name="label"
          :readOnly="hasGuessed"
          @keyup.enter="submit"
          @input="onGuessChange"
        />
        <button class="submit" :hidden="hasGuessed" @click="submit">{{ buttonText }}</button>
      </div>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useGameStore } from '@/stores/game'

const playerStore = usePlayerStore()
const gameStore = useGameStore()

const props = defineProps<{
  label?: string
  time?: number
  startingTime?: number
  correctGuess: string
}>()

const startTime = ref(0)
const endDelay = ref(0)
const progress = ref(0)
const opacity = ref(0.3)

const skip = ref(true)
const currentGuess = ref('')
const buttonText = ref('(SKIP)')

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
  startTime.value = props.time === 2.5 ? 0 : randomInteger(209 * 0.1, 209 * 0.9)
})

watch(
  () => gameStore.isRoundOver,
  () => {
    if (!gameStore.isRoundOver) {
      hasGuessed.value = false
      isSkipped.value = false
      isCorrect.value = false
      isWrong.value = false
      currentGuess.value = ''
      buttonText.value = '(SKIP)'
      if (raf) {
        cancelAnimationFrame(raf)
        opacity.value = 0
      }
    } else {
      if (currentGuess.value === '') currentGuess.value = ' '
      hasGuessed.value = true
    }
  },
)

const play = () => {
  playerStore.setStartTime(props.startingTime ?? 0)
  playerStore.setEndDelay(props.time ?? 0)
  playerStore.incrementPlayCount()

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
  hasGuessed.value = true
  if (currentGuess.value.toLowerCase() === props.correctGuess.toLowerCase()) {
    isCorrect.value = true
    gameStore.finishRound()
  } else {
    isWrong.value = true
    if (currentGuess.value === '') currentGuess.value = ' '
  }
  gameStore.incrementCurrentClue()
}

const onGuessChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value.length !== 0) {
    buttonText.value = '(SUBMIT)'
    skip.value = false
  } else {
    buttonText.value = '(SKIP)'
    skip.value = true
  }
}
</script>

<style scoped>
.clue {
  position: relative;
  overflow: hidden;
  background-color: #e6e3e3;
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
  background: #cdd8e4;
  transform-origin: left center; /* super important! */
  z-index: 0;
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

.input-frame.guessed {
  pointer-events: none;
}

.input-frame.wrong {
  background: #f03d33;
  pointer-events: none;
}

.input-frame.correct {
  background: #97deb6;
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

.label {
  align-self: end;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 700;
  z-index: 10;
}
</style>
