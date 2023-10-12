<template>
  <div
    v-if="deferredPrompt"
    class="bg-gradient-to-r from-violet-200 to-violet-400 py-5 text-center"
  >
    <p class="text-lg font-semibold text-violet-800 mb-5">
      Get our free app. It won't take up space on your phone and also works offline!
    </p>

    <button
      class="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 sm:px-10 border-b-4 border-violet-400 hover:border-violet-500 rounded-full mr-5"
      type="button"
      @click="install"
    >
      <icon-el icon="mobile-alt" size="lg" />
      <span class="ml-2">install</span>
    </button>
    <button
      class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 sm:px-10 border-b-4 border-purple-400 hover:border-purple-500 rounded-full"
      type="button"
      @click="dismiss"
    >
      <icon-el icon="eraser" size="lg" />
      <span class="ml-2">Dismiss</span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'AddToHomeBtn',
  data() {
    return {
      deferredPrompt: null
    }
  },
  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
    })
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
    })
  },
  methods: {
    async dismiss() {
      this.deferredPrompt = null
    },
    async install() {
      this.deferredPrompt.prompt()
    }
  }
}
</script>
