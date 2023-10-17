<template>
  <!-- Player -->
  <div
    class="fixed bottom-0 left-0 bg-white dark:bg-gray-900 px-4 py-2 w-full border-t border-solid border-white"
  >
    <!-- Track Info -->
    <div class="text-center dark:text-white" v-if="current_song.modified_name">
      <span class="song-title font-bold">{{ current_song.modified_name }}</span> by
      <span class="song-artist">{{ current_song.display_name }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <icon-el :icon="!playing ? 'play' : 'pause'" clr="gray-600" clrDark="white" size="xl" />
      </button>
      <!-- Current Position -->
      <div class="player-currenttime dark:text-white">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <icon-el icon="circle" clr="gray-600" size="xl" />
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration dark:text-white">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import usePlayerStore from '@/stores/player'

export default {
  name: 'MusicPlayer',
  methods: {
    ...mapActions(usePlayerStore, ['toggleAudio', 'updateSeek'])
  },
  computed: {
    ...mapState(usePlayerStore, ['playing', 'seek', 'duration', 'playerProgress', 'current_song'])
  }
}
</script>
