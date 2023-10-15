<template><div></div></template>
<script>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'ToastEl',
  props: {
    toastText: {
      type: String,
      required: true
    },
    toastType: {
      validator(value) {
        return ['info', 'success', 'warn', 'error'].includes(value)
      },
      required: true
    }
  },
  watch: {
    toastText(newVal) {
      const configuration = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      }

      switch (this.toastType) {
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
    }
  }
}
</script>
