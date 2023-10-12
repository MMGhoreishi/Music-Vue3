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
      type: String,
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
