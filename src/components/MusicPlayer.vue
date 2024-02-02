<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white dark:bg-gray-900 px-4 py-2 w-full border-t border-solid border-white"
  >
    <!-- Track Info -->
    <div class="text-center dark:text-white" v-if="playerStore.current_song.modified_name">
      <span class="song-title font-bold">{{ playerStore.current_song.modified_name }}</span> by
      <span class="song-artist">{{ playerStore.current_song.display_name }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="playerStore.toggleAudio">
        <icon-el
          :icon="!playerStore.playing ? 'play' : 'pause'"
          clr="gray-600"
          clrDark="white"
          size="xl"
        />
      </button>
      <!-- Current Position -->
      <div class="player-currenttime dark:text-white">{{ playerStore.seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="playerStore.updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerStore.playerProgress }"
        >
          <icon-el icon="circle" clr="gray-600" size="xl" />
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerStore.playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration dark:text-white">{{ playerStore.duration }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePlayerStore from '../stores/player'

const playerStore = usePlayerStore()
</script>
