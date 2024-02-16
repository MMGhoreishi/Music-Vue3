<template>
  <vee-field
    @input="updateUnsavedFlag(true)"
    type="checkbox"
    :name="name"
    value="1"
    class="dark:bg-gray-500 dark:text-white w-4 h-4 float-left -ml-6 mt-1 rounded inline-block"
  />
  <label class="inline-block">{{ label }}</label>
  <ErrorMessage class="text-red-600 dark:text-red-300 block" :name="name" />
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
  label: {
    type: String as PropType<string>,
    required: true
  }
})
</script>
