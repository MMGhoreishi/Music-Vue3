<template>
  <vee-field
    :type="type"
    :name="name"
    class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
    :placeholder="placeholder"
    @input="updateUnsavedFlag(true)"
    :value="defaultValue"
  />
  <ErrorMessage class="text-red-600 dark:text-red-300" :name="name" />
</template>
<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  name: {
    type: String as PropType<string>,
    required: true
  },
  placeholder: {
    type: String as PropType<string>,
    required: true
  },
  type: {
    validator(value: string): boolean {
      return [
        'text',
        'number',
        'email',
        'time',
        'date',
        'password',
        'select',
        'checkbox',
        'textarea'
      ].includes(value)
    },
    default: 'text'
  },
  updateUnsavedFlag: {
    type: Function as PropType<Function>,
    required: false,
    default: (bool) => ''
  },
  defaultValue: {
    type: String as PropType<string>,
    required: false
  }
})
</script>
