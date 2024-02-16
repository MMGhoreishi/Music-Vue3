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
      <form-el
        :inputs="GetFormInputsData([FormInputsEnum.AddGenre])"
        :updateUnsavedFlag="updateUnsavedFlag"
        :submitFunction="addGenre"
        :submitBtnStatus="addG_in_submission"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genresCollection, auth } from '../includes/firebase'
// import { FormInputsEnum, GetFormInputsData } from '../utility/FormBase'
import FormInputsEnum from '../utility/FormBase/FormInputsEnum'
import GetFormInputsData from '../utility/FormBase/GetFormInputsData'

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

const addG_in_submission = ref(false)
const addG_show_alert = ref(false)
const addG_alert_variant = ref('bg-blue-500')
const addG_alert_msg = ref('Please wait! Your genre is being created.')

const addGenre = async (values, { resetForm }) => {
  console.log('Add-Genre-Form-Values>>>')
  console.log(values)

  addG_show_alert.value = true
  addG_in_submission.value = true
  addG_alert_variant.value = 'bg-blue-500'
  addG_alert_msg.value = 'Please wait! Your genre is being created.'

  try {
    let valName = values.genreName.charAt(0).toUpperCase() + values.genreName.slice(1)

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

    valName = values.genreName.charAt(0).toLowerCase() + values.genreName.slice(1)

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
      genre: values.genreName,
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
