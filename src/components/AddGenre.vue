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

<script>
import { genresCollection, auth } from '@/includes/firebase'

export default {
  name: 'AddGenre',
  props: {
    updateUnsavedFlag: {
      type: Function,
      required: true
    },
    updateGenres: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces'
      },
      addG_in_submission: false,
      addG_show_alert: false,
      addG_alert_variant: 'bg-blue-500',
      addG_alert_msg: 'Please wait! Your genre is being created.'
    }
  },
  methods: {
    async addGenre(values, { resetForm }) {
      this.addG_show_alert = true
      this.addG_in_submission = true
      this.addG_alert_variant = 'bg-blue-500'
      this.addG_alert_msg = 'Please wait! Your genre is being created.'

      try {
        let valName = values.name.charAt(0).toUpperCase() + values.name.slice(1)

        let snapshot = await genresCollection
          .where('genre', '==', valName)
          .where('uid', '==', auth.currentUser.uid)
          .get()

        if (snapshot.docs.length > 0) {
          this.addG_show_alert = true
          this.addG_in_submission = false
          this.addG_alert_variant = 'bg-red-500'
          this.addG_alert_msg = 'You have already this genre in db.C'

          return
        }

        valName = values.name.charAt(0).toLowerCase() + values.name.slice(1)

        snapshot = await genresCollection
          .where('genre', '==', valName)
          .where('uid', '==', auth.currentUser.uid)
          .get()

        if (snapshot.docs.length > 0) {
          this.addG_show_alert = true
          this.addG_in_submission = false
          this.addG_alert_variant = 'bg-red-500'
          this.addG_alert_msg = 'You have already this genre in db.G'

          return
        }

        console.log('continue it!!!!!!!!')

        const genre = {
          uid: auth.currentUser.uid,
          genre: values.name,
          songs: null
        }

        await genresCollection.add(genre)
        this.updateGenres(genre)
      } catch (error) {
        this.addG_in_submission = false
        this.addG_alert_variant = 'bg-red-500'
        this.addG_alert_msg = 'An unexpected error occured. Please try again later.'
        return
      }

      this.updateUnsavedFlag(false)
      this.addG_in_submission = false
      this.addG_alert_variant = 'bg-green-500'
      this.addG_alert_msg = 'Success! Your genre has been created.'

      resetForm()
    }
  }
}
</script>
