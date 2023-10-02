export default {
  beforeMount(el, binding) {
    el.innerHTML = `<i class="fa fa-${binding.value}"></i>`
  },

  updated(el, binding) {
    el.innerHTML = `<i class="fa fa-${binding.value}"></i>`
  }
}
