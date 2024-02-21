<template>
  <vee-field
    @input="updateUnsavedFlag(true)"
    as="select"
    :name="name"
    class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
  >
    <option selected hidden value="">{{ defaultValue }}</option>
    <option :value="option" v-for="option in options" :key="option">
      {{ option }}
    </option>
  </vee-field>

  <ErrorMessage class="text-red-600 dark:text-red-300" :name="name" />
</template>
<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  name: {
    type: String as PropType<string>,
    required: true
  },
  updateUnsavedFlag: {
    type: Function as PropType<Function>,
    required: false,
    default: (bool) => ''
  },
  options: {
    type: Array as PropType<string[]>,
    required: true
  },
  defaultValue: {
    type: String as PropType<string>,
    required: false
  }
})
</script>
