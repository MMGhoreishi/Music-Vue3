<template>
  <div class="text-center py-5">
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :max-pages-shown="maxPagesShown"
      v-model="currentPage"
    />
  </div>
</template>

<script>
export default {
  name: 'PaginationDataDarkMode',
  props: {
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
  },
  data() {
    return {
      currentPage: 1
    }
  },
  watch: {
    currentPage(newVal) {
      this.getDataForCurrentPage(newVal)
    }
  }
}
</script>

<style>
.pagination-container {
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #e5e7eb;
  border: 1px solid #e5e7eb;
  color: rgb(112, 112, 112);
  font-weight: bold;
}
.paginate-buttons:hover {
  background-color: #e8deff;
}
.active-page {
  background-color: #8b5cf6;
  border: 1px solid #8b5cf6;
  color: white;
}
.active-page:hover {
  background-color: #8b5cf6;
}
.back-button:active,
.next-button:active {
  background-color: #c4c4c4;
}
</style>
