<template>
  <div class="text-center py-5 paginationDataLightMode">
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :max-pages-shown="maxPagesShown"
      v-model="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { getDataForCurrentPage } = defineProps({
  totalItems: {
    type: Number,
    require: true
  },
  itemsPerPage: {
    type: Number,
    require: true
  },
  maxPagesShown: { type: Number, require: true },
  getDataForCurrentPage: { type: Function, require: true }
})

const currentPage = ref<Number>(1)

watch(currentPage, async (newVal, oldVal) => {
  getDataForCurrentPage(newVal)
})
</script>
