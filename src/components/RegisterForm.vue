<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>

  <form-el
    :inputs="
      GetFormElementsData([
        FormElementsEnum.Name,
        FormElementsEnum.Email,
        FormElementsEnum.Age,
        FormElementsEnum.Password,
        FormElementsEnum.ConfirmPassword,
        FormElementsEnum.Country,
        FormElementsEnum.Role,
        FormElementsEnum.AcceptTermsOfService
      ])
    "
    :submitFunction="register"
    :submitBtnStatus="reg_in_submission"
    :initialValues="{
      country: 'USA',
      role: 'Artist'
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '../stores/user'
import FormElementsEnum from '../utility/FormBase/FormElementsEnum'
import GetFormElementsData from '../utility/FormBase/GetFormElementsData'

const userStore = useUserStore()

const reg_in_submission = ref<Boolean>(false)
const reg_show_alert = ref<Boolean>(false)
const reg_alert_variant = ref<String>('bg-blue-500')
const reg_alert_msg = ref<String>('Please wait! Your account is being created.')

const register = async (values) => {
  reg_show_alert.value = true
  reg_in_submission.value = true
  reg_alert_variant.value = 'bg-blue-500'
  reg_alert_msg.value = 'Please wait! Your account is being created.'

  try {
    await userStore.register(values)
  } catch (error) {
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_msg.value = 'An unexpected error occured. Please try again later.'
    return
  }

  reg_alert_variant.value = 'bg-green-500'
  reg_alert_msg.value = 'Success! Your account has been created.'
  window.location.reload()
}
</script>
