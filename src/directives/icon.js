export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value}`

    const { twoXl, lg, right, white, yellow, green, gray } = binding.modifiers

    if (twoXl) iconClass += ' text-2xl'

    if (lg) iconClass += ' text-lg'
    else iconClass += ' text-xl'

    if (right) iconClass += ' float-right'

    if (white) iconClass += ' text-white'

    if (yellow) iconClass += ' text-yellow-400'

    if (green) iconClass += ' text-green-400'

    if (gray) iconClass += ' text-gray-600'

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
