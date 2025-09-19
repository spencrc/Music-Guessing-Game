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

<script lang="ts">
import { defineComponent } from 'vue'
import { CLUES } from '@/config'
import eventBus from '@/event-bus'
import { usePlayerStore } from '@/stores/player'

let raf: number | null = null

export default defineComponent({
  props: {
    label: String,
    time: Number,
    id: Number,
  },
  data() {
    return {
      videoId: '',
      startTime: 0,
      endDelay: 0,
      progress: 0,
      opacity: 0.3,

      skip: true,
      currentGuess: '',
      buttonText: 'SKIP',

      isDisabled: false,
      hasGuessed: false,
      isSkipped: false,
      isWrong: false,
      isCorrect: false,
      playerStore: usePlayerStore(),
    }
  },
  mounted() {
    function randomInteger(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    this.endDelay = this.time || 0
    this.startTime = this.id === CLUES.length ? 0 : randomInteger(209 * 0.1, 209 * 0.9)
  },
  methods: {
    play() {
      //eventBus.$emit('playSong', { startTime: this.startTime, endDelay: this.endDelay })
      this.playerStore.setStartTime(this.startTime)
      this.playerStore.setEndDelay(this.endDelay)
      this.playerStore.togglePlaying()

      this.progress = 0
      //this.opacity = 0.3
      if (raf) cancelAnimationFrame(raf) //code taken from https://github.com/VilleOlof/vyletponlde/blob/main/frontend/src/lib/AudioCard.svelte
      const duration = this.time! * 1000
      const startTime = performance.now()
      const tick = (time: number) => {
        const elapsed = time - startTime
        if (elapsed > duration) {
          this.progress = 1
          // this.opacity = 0.3 - (elapsed - duration) / 1000;
          // if (this.opacity <= 0) {
          //   this.opacity = 0
          //   return
          // }
          raf = requestAnimationFrame(tick)
          return
        }
        this.progress = elapsed / duration
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    },
    submit() {
      console.log('Guess:', this.currentGuess)
      this.hasGuessed = true
      if (this.skip) {
        this.isSkipped = true
        this.currentGuess = 'SKIPPED'
      } else if (this.currentGuess === 'Deletee') {
        this.isCorrect = true
      } else {
        this.isWrong = true
      }
    },
    onGuessChange(event: Event) {
      const target = event.target as HTMLInputElement
      const value = target.value
      if (value.length !== 0) {
        this.buttonText = 'SUBMIT'
        this.skip = false
      } else {
        this.buttonText = 'SKIP'
        this.skip = true
      }
    },
  },
})
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
  background: white;
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
