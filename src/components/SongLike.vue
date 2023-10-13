<template>
  <div>
    <button type="button" @click="addLike">
      <icon-el icon="heart" :clr="likeStyle" :clrDark="likeStyleDark" :size="iconSize" />
    </button>

    <span class="dark:text-white ml-2 italic">{{ songLikesNum }}</span>
  </div>
</template>

<script>
import { songsCollection, auth } from '@/includes/firebase'

export default {
  name: 'SongLike',
  props: {
    song: {
      type: Object,
      required: true
    },
    iconSize: {
      validator(value) {
        return [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
          '7xl',
          '8xl',
          '9xl'
        ].includes(value)
      },
      required: true
    }
  },
  data() {
    return {
      likes: false,
      songLikesNum: this.song.likes,
      songLikers: this.song.likers,
      continueLike: false,
      loopOnlyOnce: false
    }
  },
  computed: {
    likeStyle() {
      return this.likes ? 'red-400' : 'gray-600'
    },
    likeStyleDark() {
      return !this.likes ? 'white' : null
    }
  },
  created() {
    if (this.songLikers) {
      const songLikersArray = this.songLikers.split('-')

      for (var i = 0; i < songLikersArray.length; i++) {
        if (auth.currentUser.uid === songLikersArray[i]) {
          this.likes = true

          break
        }
      }
    }
  },
  methods: {
    async addLike() {
      if (this.songLikers && !this.loopOnlyOnce) {
        const songLikersArray = this.songLikers.split('-')

        for (var i = 0; i < songLikersArray.length; i++) {
          if (auth.currentUser.uid === songLikersArray[i]) {
            this.continueLike = true
            this.loopOnlyOnce = true
            break
          }
        }
      }

      if (!this.continueLike) {
        const songLikersBackup = this.songLikers

        try {
          const likers = this.songLikers
            ? this.songLikers + '-' + auth.currentUser.uid
            : auth.currentUser.uid

          this.likes = true
          this.songLikesNum += 1
          this.songLikers = likers
          this.continueLike = true

          await songsCollection.doc(this.song.docID).update({
            likes: this.songLikesNum,
            likers
          })
        } catch (error) {
          this.likes = false
          this.songLikesNum -= 1

          this.songLikers = songLikersBackup
          this.continueLike = false

          alert('An unexpected error occured. Please try again later.')

          return
        }
      } else {
        const songLikersBackup = this.songLikers
        const songLikersArray = this.songLikers.split('-')

        let songLikersArray2 = null

        for (let i = 0; i < songLikersArray.length; i++) {
          if (auth.currentUser.uid !== songLikersArray[i]) {
            songLikersArray2 = songLikersArray2
              ? songLikersArray2 + '-' + songLikersArray[i]
              : songLikersArray[i]
          }
        }

        try {
          this.likes = false
          this.songLikesNum -= 1

          this.songLikers = songLikersArray2
          this.continueLike = false

          await songsCollection.doc(this.song.docID).update({
            likes: this.songLikesNum,
            likers: songLikersArray2
          })
        } catch (error) {
          this.likes = true
          this.songLikesNum += 1

          this.songLikers = songLikersBackup
          this.continueLike = true

          alert('An unexpected error occured. Please try again later.')
          return
        }
      }
    }
  }
}
</script>
