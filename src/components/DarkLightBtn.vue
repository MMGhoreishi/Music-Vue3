<template>
  <div
    @click="toggleDark()"
    class="px-4 py-2 bg-transparent cursor-pointer"
    :class="isDark ? 'text-white' : 'text-violet-500'"
  >
    <icon-el
      :icon="isDark ? 'moon' : 'sun'"
      clr="text-white"
      clrDark="text-violet-500"
      :right="true"
      size="xl"
    />
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
