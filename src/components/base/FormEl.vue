<template>
  <vee-form :validation-schema="schema" @submit="submitFunction" :initial-values="initialValues">
    <div class="mb-3" :class="{ 'pl-6': item.type === 'checkbox' }" v-for="item in inputs">
      <!-- Select -->
      <select-el
        :name="item.name"
        :updateUnsavedFlag="updateUnsavedFlag"
        :options="item.options"
        v-if="item.type === 'select'"
        :defaultValue="item.defaultValue"
      />

      <!-- Input CheckBox -->
      <checkbox-el
        :name="item.name"
        :updateUnsavedFlag="updateUnsavedFlag"
        :label="item.placeholderLabel"
        v-if="item.type === 'checkbox'"
      />

      <!-- TextArea -->
      <textarea-el
        :name="item.name"
        :updateUnsavedFlag="updateUnsavedFlag"
        :placeholder="item.placeholderLabel"
        v-if="item.type === 'textarea'"
      />

      <!-- input -->
      <input-el
        :name="item.name"
        :placeholder="item.placeholderLabel"
        :type="item.type"
        v-if="item.type !== 'checkbox' && item.type !== 'select' && item.type !== 'textarea'"
        :updateUnsavedFlag="updateUnsavedFlag"
        :defaultValue="item.defaultValue"
      />
    </div>

    <div class="grid grid-cols-2 grid-rows-1 gap-5" v-if="goBackBtn">
      <!-- <button
        type="button"
        class="py-1.5 px-3 rounded text-white bg-gray-600"
        :disabled="in_submission"
        @click.prevent="goBackBtn"
      >
        Go Back
      </button> -->

      <button-el
        type="button"
        text="Go Back"
        :disabled="submitBtnStatus"
        :bgClr="'gray-600'"
        txtClr="white"
        :hvrBg="'gray-700'"
        hvrTxt="white"
        @click.prevent="goBackBtn"
      />

      <button-el
        type="submit"
        text="Add Genre"
        :disabled="submitBtnStatus"
        :bgClr="'violet-500'"
        txtClr="white"
        :hvrBg="'violet-600'"
        hvrTxt="white"
      />
    </div>

    <!-- Submit Button -->
    <button-el
      v-else
      type="submit"
      text="Add Genre"
      :disabled="submitBtnStatus"
      :bgClr="'violet-500'"
      txtClr="white"
      :hvrBg="'violet-600'"
      hvrTxt="white"
    />
  </vee-form>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import IFormElementsData from '../../utility/FormBase/IFormElementsData'

const { inputs } = defineProps({
  initialValues: {
    type: Object as PropType<Object>,
    required: false
  },
  inputs: {
    type: Array as PropType<IFormElementsData[]>,
    required: true
  },
  updateUnsavedFlag: {
    type: Function as PropType<Function>,
    required: false
  },
  submitFunction: {
    type: Function as PropType<Function>,
    required: true
  },
  submitBtnStatus: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  goBackBtn: {
    type: Function as PropType<Function>,
    default: null,
    required: false
  }
})

const schema = computed(() => {
  const schemaData = {}
  for (let i = 0; i < inputs.length; i++) schemaData[inputs[i].name] = inputs[i].schema
  return schemaData
})
</script>
