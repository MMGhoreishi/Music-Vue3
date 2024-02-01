<template><div></div></template>
<script setup lang="ts">
import { PropType, watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// toastText: {
//   type: String as PropType<string>,
//   required: true
// }

const { toastText, toastType } = defineProps({
  toastText: String,
  toastType: {
    validator(value: string) {
      return ['info', 'success', 'warn', 'error'].includes(value)
    },
    required: true
  }
})

watch(toastText, (newVal: string, oldVal: string) => {
  const configuration: object = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  }

  switch (toastType) {
    case 'info':
      toast.info(newVal, configuration)
      break

    case 'success':
      toast.success(newVal, configuration)
      break

    case 'warn':
      toast.warn(newVal, configuration)
      break

    case 'error':
      toast.error(newVal, configuration)
      break
  }
})
</script>
