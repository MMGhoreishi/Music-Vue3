<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block text-gray-600 dark:text-white"
      >
        {{ song.modified_name }}
      </router-link>

      <span class="text-gray-500 dark:text-gray-400 text-sm">{{ song.display_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{
          name: 'song',
          params: { id: song.docID },
          hash: '#comments'
        }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <icon-el icon="comments" clr="gray-600" clrDark="white" size="xl" />
          <span class="dark:text-white ml-2">{{ song.comment_count }}</span>
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    song: {
      type: Object,
      required: true
    }
  }
}
</script>
