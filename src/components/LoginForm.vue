<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <form-el
    :inputs="GetFormInputsData([FormInputsEnum.Email, FormInputsEnum.Password])"
    :submitFunction="login"
    :submitBtnStatus="login_in_submission"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '../stores/user'
import FormInputsEnum from '../utility/FormBase/FormInputsEnum'
import GetFormInputsData from '../utility/FormBase/GetFormInputsData'

const userStore = useUserStore()

const login_in_submission = ref<Boolean>(false)
const login_show_alert = ref<Boolean>(false)
const login_alert_variant = ref<String>('bg-blue-500')
const login_alert_msg = ref<String>('Please wait! We are logging you in.')

const login = async (values) => {
  login_in_submission.value = true
  login_show_alert.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_msg.value = 'Please wait! We are logging you in.'

  try {
    await userStore.authenticate(values)
  } catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'bg-red-500'
    login_alert_msg.value = 'Invalid login details.'
    return
  }

  login_alert_variant.value = 'bg-green-500'
  login_alert_msg.value = 'Success! You are now logged in.'
  window.location.reload()
}
</script>
