<template>
  <main>
    <!-- Add To Homescreen Button -->
    <add-to-home-btn />

    <!-- Introduction -->
    <section class="py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="mx-auto">
      <div
        class="bg-white dark:bg-gray-900 dark:text-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <icon-el icon="headphones-alt" :right="true" clr="yellow-400" size="2xl" />
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>

        <!-- Playlist -->
        <div
          class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10 px-5"
        >
          <song-item v-for="song in limitSongs()" :key="song.docID" :song="song" />
        </div>
        <!-- .. end Playlist -->

        <pagination-data-dark-mode
          v-if="isDark"
          :totalItems="totalItems"
          :itemsPerPage="maxPerPage"
          :maxPagesShown="maxPagesShown"
          :getDataForCurrentPage="this.getSongs"
        />

        <pagination-data-light-mode
          v-if="!isDark"
          :totalItems="totalItems"
          :itemsPerPage="maxPerPage"
          :maxPagesShown="maxPagesShown"
          :getDataForCurrentPage="this.getSongs"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { useDark } from '@vueuse/core'
import PaginationDataDarkMode from '@/components/PaginationDataDarkMode.vue'
import PaginationDataLightMode from '@/components/PaginationDataLightMode.vue'
import { songsCollection, numbersCollection } from '@/includes/firebase'
import SongItem from '@/components/SongItem.vue'
import AddToHomeBtn from '@/components/AddToHomeBtn.vue'

export default {
  name: 'HomeView',
  components: { SongItem, AddToHomeBtn, PaginationDataDarkMode, PaginationDataLightMode },
  data() {
    return {
      isDark: useDark(),

      songs: [],
      maxPerPage: 3, //25
      maxPerPage2: 3,

      totalItems: 1,
      maxPagesShown: 1,
      lastDocIndex: -1
    }
  },
  async created() {
    this.getSongs()
  },
  methods: {
    async getSongs(newVal) {
      let snapshots

      if (!newVal) {
        const snapshotSongsNumber = await numbersCollection.get()
        snapshotSongsNumber.forEach(async (document) => {
          this.totalItems = document.data().songs
          this.maxPagesShown = Math.round(document.data().songs / this.maxPerPage)
        })

        snapshots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get()
      } else {
        this.lastDocIndex = newVal * this.maxPerPage - this.maxPerPage
        if (this.lastDocIndex > 0) this.lastDocIndex -= 1

        this.maxPerPage2 = newVal * this.maxPerPage

        if (this.songs.length - 1 < this.lastDocIndex + this.maxPerPage) {
          const lastDoc = await songsCollection.doc(this.songs[this.lastDocIndex].docID).get()
          snapshots = await songsCollection
            .orderBy('modified_name')
            .startAfter(lastDoc)
            .limit(this.maxPerPage)
            .get()
        } else return
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        })
      })
    },
    limitSongs() {
      if (this.lastDocIndex === 0) this.lastDocIndex -= 1
      const songs2 = []

      this.songs.forEach((item, index) => {
        if (index > this.lastDocIndex && index < this.maxPerPage2) songs2.push(item)
      })

      return songs2
    }
  }
}
</script>
