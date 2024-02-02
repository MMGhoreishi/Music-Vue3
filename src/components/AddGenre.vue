<template>
  <div
    class="mb-5 bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-200 relative flex flex-col"
  >
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <icon-el icon="palette" :right="true" clr="green-400" size="xl" />
      <span class="card-title">My Genres</span>
    </div>
    <div
      class="text-white text-center font-bold p-4 rounded"
      v-if="addG_show_alert"
      :class="addG_alert_variant"
    >
      {{ addG_alert_msg }}
    </div>
    <div class="p-6">
      <vee-form :validation-schema="schema" @submit="addGenre">
        <!-- Genre Name -->
        <div class="mb-3">
          <vee-field
            type="text"
            name="name"
            class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre Name"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600 dark:text-red-300" name="name" />
        </div>

        <!-- Submit Button -->
        <button-el
          type="submit"
          text="Add Genre"
          :disabled="addG_in_submission"
          :bgClr="'violet-500'"
          txtClr="white"
          :hvrBg="'violet-600'"
          hvrTxt="white"
        />
      </vee-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genresCollection, auth } from '../includes/firebase'

const { updateUnsavedFlag, updateGenres } = defineProps({
  updateUnsavedFlag: {
    type: Function,
    required: true
  },
  updateGenres: {
    type: Function,
    required: true
  }
})

const schema = {
  name: 'required|min:3|max:100|alpha_spaces'
}

const addG_in_submission = ref(false)
const addG_show_alert = ref(false)
const addG_alert_variant = ref('bg-blue-500')
const addG_alert_msg = ref('Please wait! Your genre is being created.')

const addGenre = async (values, { resetForm }) => {
  addG_show_alert.value = true
  addG_in_submission.value = true
  addG_alert_variant.value = 'bg-blue-500'
  addG_alert_msg.value = 'Please wait! Your genre is being created.'

  try {
    let valName = values.name.charAt(0).toUpperCase() + values.name.slice(1)

    let snapshot = await genresCollection
      .where('genre', '==', valName)
      .where('uid', '==', auth.currentUser.uid)
      .get()

    if (snapshot.docs.length > 0) {
      addG_show_alert.value = true
      addG_in_submission.value = false
      addG_alert_variant.value = 'bg-red-500'
      addG_alert_msg.value = 'You have already this genre'

      return
    }

    valName = values.name.charAt(0).toLowerCase() + values.name.slice(1)

    snapshot = await genresCollection
      .where('genre', '==', valName)
      .where('uid', '==', auth.currentUser.uid)
      .get()

    if (snapshot.docs.length > 0) {
      addG_show_alert.value = true
      addG_in_submission.value = false
      addG_alert_variant.value = 'bg-red-500'
      addG_alert_msg.value = 'You have already this genre'

      return
    }

    const genre = {
      uid: auth.currentUser.uid,
      genre: values.name,
      songs: null
    }

    await genresCollection.add(genre)
    updateGenres(genre)
  } catch (error) {
    addG_in_submission.value = false
    addG_alert_variant.value = 'bg-red-500'
    addG_alert_msg.value = 'An unexpected error occured. Please try again later.'
    return
  }

  updateUnsavedFlag(false)
  addG_in_submission.value = false
  addG_alert_variant.value = 'bg-green-500'
  addG_alert_msg.value = 'Success! Your genre has been created.'

  resetForm()
}
</script>
