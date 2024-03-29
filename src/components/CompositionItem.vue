<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <icon-el icon="times" clr="white" size="xl" />
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <icon-el icon="pencil-alt" clr="white" size="xl" />
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>

      <form-el
        :inputs="
          GetFormElementsData(
            [FormElementsEnum.ModifiedName, FormElementsEnum.Genres],
            [
              {
                selectOptions: genresNames,
                selectOtionsEnumKey: FormElementsEnum.Genres
              }
            ]
          )
        "
        :submitFunction="edit"
        :submitBtnStatus="in_submission"
        :initial-values="song"
        :goBackBtn="() => (showForm = false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { songsCollection, storage } from '../includes/firebase'
import FormElementsEnum from '../utility/FormBase/FormElementsEnum'
import GetFormElementsData from '../utility/FormBase/GetFormElementsData'

const { song, index, updateSong, updateUnsavedFlag, removeSong, genres } = defineProps({
  song: {
    type: Object,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  updateSong: {
    type: Function,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  removeSong: {
    type: Function,
    required: true
  },
  updateUnsavedFlag: {
    type: Function,
    required: true
  }
})

const genresNames = computed(() => {
  const genresNamesArray: string[] = []

  for (let i = 0; i < genres.length; i++) {
    genresNamesArray.push(genres[i].genre)
  }

  return genresNamesArray
})

const showForm = ref<Boolean>(false)

const in_submission = ref<Boolean>(false)
const show_alert = ref<Boolean>(false)
const alert_variant = ref<String>('bg-blue-500')
const alert_message = ref<String>('Please wait! Updating song info.')

const edit = async (values) => {
  in_submission.value = true
  show_alert.value = true
  alert_variant.value = 'bg-blue-500'
  alert_message.value = 'Please wait! Updating song info.'

  try {
    await songsCollection.doc(song.docID).update(values)
  } catch (error) {
    in_submission.value = false
    alert_variant.value = 'bg-red-500'
    alert_message.value = 'Something went wrong! Try again later'
    return
  }

  updateSong(index, values)
  updateUnsavedFlag(false)

  in_submission.value = false
  alert_variant.value = 'bg-green-500'
  alert_message.value = 'Success!'
}

const deleteSong = async () => {
  const storageRef = storage.ref()
  const songRef = storageRef.child(`songs/${song.original_name}`)

  await songRef.delete()

  await songsCollection.doc(song.docID).delete()

  removeSong(index)
}
</script>
