<template>
  <button
    :type="type"
    class="block w-full py-1.5 px-3 transition"
    :class="bindClasses"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

const { bgClr, bgClrDark, txtClr, hvrBg, hvrTxt, roundedFull } = defineProps({
  type: {
    validator(value: string): boolean {
      return ['button', 'reset', 'submit'].includes(value)
    },
    default: 'button'
  },
  text: {
    type: String as PropType<string>,
    required: true
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  bgClr: {
    type: String as PropType<string>,
    required: true
  },
  bgClrDark: {
    type: String as PropType<string>,
    required: false
  },
  txtClr: {
    type: String as PropType<string>,
    required: true
  },
  hvrBg: {
    type: String as PropType<string>,
    required: true
  },
  hvrTxt: {
    type: String as PropType<string>,
    required: true
  },
  roundedFull: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false
  }
})

const bindClasses = computed(() => [
  bgClr ? 'bg-' + bgClr : null,
  bgClrDark ? 'dark:bg-' + bgClrDark : null,
  txtClr ? 'text-' + txtClr : null,
  hvrBg ? 'hover:bg-' + hvrBg : null,
  hvrTxt ? 'hover:text-' + hvrTxt : null,
  roundedFull ? 'rounded-full' : 'rounded'
])
</script>
