<template>
  <vee-form :validation-schema="schema" @submit="submitFunction" :initial-values="initialValues">
    <div class="mb-3" :class="{ 'pl-6': item.type === 'checkbox' }" v-for="item in inputs">
      <!-- Select -->
      <select-el
        :name="item.name"
        :updateUnsavedFlag="updateUnsavedFlag"
        :options="item.options"
        v-if="item.type === 'select'"
      />

      <!-- Input CheckBox -->
      <checkbox-el
        :name="item.name"
        :updateUnsavedFlag="updateUnsavedFlag"
        :label="item.label"
        v-if="item.type === 'checkbox'"
      />

      <!-- input -->
      <input-el
        :name="item.name"
        :placeholder="item.placeholder"
        :type="item.type"
        v-if="item.type !== 'checkbox' && item.type !== 'select'"
        :updateUnsavedFlag="updateUnsavedFlag"
      />
    </div>

    <!-- Submit Button -->
    <button-el
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
  }
})

console.log('Test-Select>>>')
console.log(inputs)

const schema = computed(() => {
  const schemaData = {}
  for (let i = 0; i < inputs.length; i++) schemaData[inputs[i].name] = inputs[i].schema
  return schemaData
})
</script>
