<template>
  <button
    :type="type"
    class="block w-full py-1.5 px-3 rounded transition"
    :class="bindClasses"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonEl',
  props: {
    type: {
      validator(value) {
        return ['button', 'reset', 'submit'].includes(value)
      },
      default: 'button'
    },
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    },
    bgClr: {
      type: String,
      required: true
    },
    bgClrDark: {
      type: String
    },
    txtClr: {
      type: String,
      required: true
    },
    hvrBg: {
      type: String,
      required: true
    },
    hvrTxt: {
      type: String,
      required: true
    }
  },
  computed: {
    bindClasses() {
      return [
        this.bgClr ? 'bg-' + this.bgClr : null,
        this.bgClrDark ? 'dark:bg-' + this.bgClrDark : null,
        this.txtClr ? 'text-' + this.txtClr : null,
        this.hvrBg ? 'hover:bg-' + this.hvrBg : null,
        this.hvrTxt ? 'hover:text-' + this.hvrTxt : null
      ]
    }
  }
}
</script>
