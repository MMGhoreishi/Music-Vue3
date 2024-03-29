<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <icon-el icon="play" clr="gray-600" size="2xl" />
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <!-- .replace('.mp3', '') -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>

          <div class="mt-3">
            <song-like :song="song" iconSize="2xl" v-if="song.modified_name" />
          </div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white dark:bg-gray-700 dark:text-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ( {{ song.comment_count }} )</span>
          <icon-el icon="comments" :right="true" clr="green-400" size="xl" />
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>

          <form-el
            v-if="userLoggedIn"
            :inputs="GetFormElementsDataComputed"
            :submitFunction="addComment"
            :submitBtnStatus="comment_in_submission"
          />

          <div v-else class="text-white text-center font-bold p-4 rounded mb-4 bg-orange-400">
            You need to log in to send comment.
          </div>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="dark:bg-gray-500 dark:text-white block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 text-white bg-white dark:bg-gray-600 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time> {{ commentDate(comment.datePosted) }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase'
import FormElementsEnum from '../utility/FormBase/FormElementsEnum'
import GetFormElementsData from '../utility/FormBase/GetFormElementsData'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'
import moment from 'moment'

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3'
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted.',
      comments: [],
      sort: '1'
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') return new Date(b.datePosted) - new Date(a.datePosted)

        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    },
    GetFormElementsDataComputed() {
      return GetFormElementsData([FormElementsEnum.Comment])
    }
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get()

    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: 'home' })
        return
      }

      const { sort } = vm.$route.query

      vm.sort = sort === '1' || sort === '2' ? sort : '1'

      vm.song = { docID: to.params.id, ...docSnapshot.data() }

      vm.getComments()
    })
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong']),
    commentDate(date) {
      return moment(date).fromNow()
    },
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true
      this.comment_show_alert = true
      this.comment_alert_variant = 'bg-blue-500'
      this.comment_alert_message = 'Please wait! Your comment is being submitted.'

      try {
        const comment = {
          content: values.comment,
          datePosted: new Date().toString(),
          sid: this.$route.params.id,
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid
        }

        this.comments.push({
          ...comment,
          ...{ docID: this.$route.params.id + Math.random() * 10000 }
        })

        await commentsCollection.add(comment)

        this.song.comment_count += 1
        await songsCollection.doc(this.$route.params.id).update({
          comment_count: this.song.comment_count
        })
      } catch (error) {
        this.comments.pop()

        this.comment_in_submission = false
        this.comment_alert_variant = 'bg-red-500'
        this.comment_alert_message = 'An unexpected error occured. Please try again later.'

        return
      }

      this.comment_in_submission = false
      this.comment_alert_variant = 'bg-green-500'
      this.comment_alert_message = 'Comment added!'

      resetForm()
    },
    async getComments() {
      const snapshots = await commentsCollection.where('sid', '==', this.$route.params.id).get()

      this.comments = []

      snapshots.forEach((doc) => [
        this.comments.push({
          docID: doc.id,
          ...doc.data()
        })
      ])
    }
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) return

      this.$router.push({
        query: {
          sort: newVal
        }
      })
    }
  }
}
</script>
