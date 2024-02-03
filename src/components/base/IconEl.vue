<template>
  <i :class="bindClasses"></i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { icon, size, clr, clrDark, right } = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    validator(value: string): boolean {
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
  },
  right: {
    type: Boolean,
    default: false,
    required: false
  },
  clr: {
    type: String,
    required: false
  },
  clrDark: {
    type: String,
    required: false
  }
})

const bindClasses = computed(() => [
  icon ? 'fa fa-' + icon : null,
  size ? 'text-' + size : null,
  clr ? 'text-' + clr : null,
  clrDark ? 'dark:text-' + clrDark : null,
  right ? ' float-right' : null
])
</script>
