<template>
  <div class="clue" :class="{ disabled: isDisabled }">
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
import songs from '@/songs'
import eventBus from '@/event-bus'

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

      skip: true,
      currentGuess: '',
      buttonText: 'SKIP',

      isDisabled: false,
      hasGuessed: false,
      isSkipped: false,
      isWrong: false,
      isCorrect: false,
    }
  },
  mounted() {
    function randomInteger(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const song = songs['Deletee (Intro)']
    this.endDelay = this.time || 0
    this.startTime = this.id === CLUES.length ? 0 : randomInteger(song.d * 0.1, song.d * 0.9)
  },
  methods: {
    play() {
      eventBus.$emit('playSong', { startTime: this.startTime, endDelay: this.endDelay })
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
}
</style>
