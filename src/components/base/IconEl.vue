<template>
  <i :class="bindClasses"></i>
</template>

<script>
export default {
  name: 'IconEl',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      validator(value) {
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
      default: false
    },
    clr: {
      type: String
    },
    clrDark: {
      type: String
    }
  },
  computed: {
    bindClasses() {
      return [
        this.icon ? 'fa fa-' + this.icon : null,
        this.size ? 'text-' + this.size : null,
        this.clr ? 'text-' + this.clr : null,
        this.clrDark ? 'dark:text-' + this.clrDark : null,
        this.right ? ' float-right' : null
      ]
    }
  }
}
</script>
