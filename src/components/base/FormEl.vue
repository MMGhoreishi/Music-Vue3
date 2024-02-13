<template>
  <vee-form :validation-schema="schema" @submit="submitFunction">
    <div class="mb-3" v-for="item in inputs">
      <input-el
        :name="item.name"
        :placeholder="item.placeholder"
        :type="item.type"
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
import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'

const { inputs } = defineProps({
  inputs: {
    type: Array as PropType<IFormInputsData[]>,
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

console.log('Login Inputs>>>>')
console.log(inputs)

const schema = computed(() => {
  const schemaData = {}
  for (let i = 0; i < inputs.length; i++) schemaData[inputs[i].name] = inputs[i].schema
  return schemaData
})
</script>
