<template>
  <div
    class="mb-2 bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-200 relative flex flex-col"
  >
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <icon-el icon="upload" :right="true" clr="green-400" size="2xl" />
      <span class="card-title">Upload</span>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="dragoverStyle"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <icon-el :icon="upload.icon" size="xl" />
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <toast-el :toastText="toastText" :toastType="toastType" />
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase'

export default {
  name: 'UploadSong',
  props: {
    addSong: {
      type: Function,
      required: true
    },
    btnClicked: {
      type: Boolean,
      required: true
    },
    changeSongId: {
      type: Function,
      required: true
    },
    validationSong: {
      type: Boolean,
      required: true
    },
    changeValidationSong: {
      type: Function,
      required: true
    },
    validationCover: {
      type: Boolean,
      required: true
    },
    changeValidationCover: {
      type: Function,
      required: true
    },
    changeBtnClicked: {
      type: Function,
      required: true
    }
  },
  computed: {
    dragoverStyle() {
      return { 'bg-green-400 border-green-400 border-solid text-white': this.is_dragover }
    }
  },
  data() {
    return {
      is_dragover: false,
      uploads: [],
      eventFile: null,
      toastText: '',
      toastType: 'error'
    }
  },
  methods: {
    upload($event) {
      this.eventFile = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files]
    },
    upload2() {
      this.uploads = []

      if (!this.eventFile) {
        this.changeValidationSong(true)

        this.toastText = 'Please drag a song'
        this.toastType = 'error'

        this.is_dragover = false

        return
      }

      this.eventFile.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          this.changeValidationSong(true)

          this.toastText = 'Please drag only mp3 file'
          this.toastType = 'error'

          this.is_dragover = false

          return
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'times',
            text_class: 'text-red-400'
          })

          console.log('>>>>You can not upload because you are offline!!!!')

          return
        }

        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'spinner fa-spin',
            text_class: ''
          }) - 1

        task.on(
          'state_changed',
          (snapshot) => {
            console.log('state_changed-snapshot****')

            if (this.validationCover) {
              this.uploads[uploadIndex].task.cancel()

              this.uploads[uploadIndex].variant = 'bg-red-400'
              this.uploads[uploadIndex].icon = 'times'
              this.uploads[uploadIndex].text_class = 'text-red-400'

              this.is_dragover = false

              this.changeBtnClicked(false)

              this.changeValidationCover(false)

              return
            }

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploads[uploadIndex].current_progress = progress
          },
          (error) => {
            this.uploads[uploadIndex].variant = 'bg-red-400'
            this.uploads[uploadIndex].icon = 'times'
            this.uploads[uploadIndex].text_class = 'text-red-400'
            console.log(error)
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
              likes: 0,
              likers: null
            }

            song.url = await task.snapshot.ref.getDownloadURL()
            const songRef = await songsCollection.add(song)
            const songSnapshot = await songRef.get()

            this.addSong(songSnapshot)

            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'check'
            this.uploads[uploadIndex].text_class = 'text-green-400'
            this.is_dragover = false
            this.changeSongId(songSnapshot.id)
          }
        )
      })
    }
  },
  watch: {
    btnClicked(newVal) {
      console.log('this.validationCover btnCliked in watch>>>')
      console.log(this.validationCover)

      if (newVal) this.upload2()
      console.log('Hello World BTN!!!!', newVal)
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>
