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
    text: String,
    disabled: {
      type: Boolean,
      default: true
    },
    bgClr: String,
    txtClr: String,
    hvrBg: String,
    hvrTxt: String
  },
  computed: {
    bindClasses() {
      return [this.bgClr, this.txtClr, this.hvrBg, this.hvrTxt]
    }
  }
}
</script>
