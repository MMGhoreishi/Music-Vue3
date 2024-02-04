<template>
  <div
    class="border-2 border-violet-300 dark:border-violet-200 relative block group bg-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
  >
    <div class="p-3">
      <div class="inset-0 w-full h-full">
        <div class="w-full h-44 relative rounded object-cover mb-3">
          <div
            class="absolute inset-0 bg-cover bg-center z-0"
            :style="{ backgroundImage: 'url(' + song.coverUrl + ')' }"
          ></div>

          <div class="relative h-44 flex items-end justify-end p-1 text-black">
            <div
              class="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
            >
              <button
                @click.prevent="playMusic"
                type="button"
                class="text-2xl font-semibold bg-green-500 h-11 w-11 rounded-full flex items-center justify-center"
              >
                <icon-el
                  v-if="playerStore.current_song.docID === song.docID"
                  :icon="!playerStore.playing ? 'play' : 'pause'"
                  clr="gray-600"
                  size="xl"
                />
                <icon-el v-else :icon="'play'" clr="gray-600" size="2xl" />
              </button>
            </div>
          </div>
        </div>

        <a href="#">
          <h5 class="mb-2 text-lg tracking-tight font-semibold">
            <router-link
              :to="{ name: 'song', params: { id: song.docID } }"
              class="text-base font-bold block text-gray-600 dark:text-white"
            >
              {{ song.modified_name.replace('.mp3', '') }}
            </router-link>
          </h5>
        </a>
        <p class="mb-10 font-normal text-sm text-gray-400">{{ song.display_name }}</p>
        <div class="absolute bottom-0 w-full px-10 pb-3">
          <div class="grid grid-cols-2">
            <song-like :song="song" iconSize="sm" />
            <div>
              <router-link
                custom
                :to="{
                  name: 'song',
                  params: { id: song.docID },
                  hash: '#comments'
                }"
                v-slot="{ navigate }"
              >
                <span class="comments float-right" @click="navigate">
                  <icon-el icon="comments" clr="gray-600" clrDark="white" size="sm" />
                  <span class="dark:text-white ml-2 text-sm">{{ song.comment_count }}</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePlayerStore from '../stores/player'
import SongLike from '../components/SongLike.vue'

const playerStore = usePlayerStore()

const { song } = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const playMusic = () => {
  if (playerStore.current_song.docID !== song.docID) playerStore.newSong(song)
  else playerStore.toggleAudio()
}
</script>
