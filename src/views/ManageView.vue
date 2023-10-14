<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-file :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <add-genre :updateUnsavedFlag="updateUnsavedFlagGenre" />
        <div
          class="bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <icon-el icon="compact-disc" :right="true" clr="green-400" size="xl" />
            <span class="card-title">My Songs</span>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlagEdit"
              :genres="genres"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadFile from '@/components/UploadFile.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import AddGenre from '@/components/AddGenre.vue'
import { auth, songsCollection, genresCollection } from '@/includes/firebase'

export default {
  name: 'ManageView',
  components: { UploadFile, CompositionItem, AddGenre },
  data() {
    return {
      songs: [],
      genres: [],
      unsavedFlagEdit: false,
      unsavedFlagGenre: false
    }
  },
  async created() {
    const snapshotSongs = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
    snapshotSongs.forEach(this.addSong)

    const snapshotGenres = await genresCollection.where('uid', '==', auth.currentUser.uid).get()
    snapshotGenres.forEach(this.addGenres)
  },
  methods: {
    updateSong(i, { modified_name, genre }) {
      this.songs[i].modified_name = modified_name
      this.songs[i].genre = genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    },
    addGenres(document) {
      const genre = {
        ...document.data(),
        docID: document.id
      }

      this.genres.push(genre)
    },
    updateUnsavedFlagEdit(value) {
      this.unsavedFlagEdit = value
    },
    updateUnsavedFlagGenre(value) {
      this.unsavedFlagGenre = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlagEdit && !this.unsavedFlagGenre) next()
    else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
}
</script>
