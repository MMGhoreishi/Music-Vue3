<template>
  <div class="fixed z-10 inset-0 overflow-y-auto dark:text-white" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white dark:bg-gray-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold"></p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
              <icon-el icon="times" size="xl" />
            </div>
          </div>

          <div
            class="bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <icon-el icon="images" :right="true" clr="green-400" size="2xl" />
              <span class="card-title">Upload Cover</span>
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
              <input type="file" multiple @change="upload($event)" />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, songsCollection } from '@/includes/firebase'

export default {
  name: 'UploadCover',
  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  props: {
    songId: {
      type: String,
      required: true
    }
  },
  computed: {
    dragoverStyle() {
      return { 'bg-green-400 border-green-400 border-solid': this.is_dragover }
    }
  },
  methods: {
    upload($event) {
      this.is_dragover = false

      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

      files.forEach((file) => {
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') return

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
        const coverRef = storageRef.child(`covers/${this.songId}`)
        const task = coverRef.put(file)

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
            const coverUrl = await task.snapshot.ref.getDownloadURL()

            console.log('my cover coverUrl>>>>')
            console.log(coverUrl)

            try {
              await songsCollection.doc(this.songId).update({ coverUrl })
            } catch (error) {
              this.uploads[uploadIndex].variant = 'bg-red-400'
              this.uploads[uploadIndex].icon = 'times'
              this.uploads[uploadIndex].text_class = 'text-red-400'
              console.log(error)
              return
            }

            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'check'
            this.uploads[uploadIndex].text_class = 'text-green-400'
          }
        )
      })
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>
