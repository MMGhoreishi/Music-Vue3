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
      GetFormInputsData([
        FormInputsEnum.Name,
        FormInputsEnum.Email,
        FormInputsEnum.Age,
        FormInputsEnum.Password,
        FormInputsEnum.ConfirmPassword,
        FormInputsEnum.Country,
        FormInputsEnum.Role,
        FormInputsEnum.AcceptTermsOfService
      ])
    "
    :submitFunction="register"
    :submitBtnStatus="reg_in_submission"
  />

  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600 dark:text-red-300" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600 dark:text-red-300" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600 dark:text-red-300" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600 dark:text-red-300" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600 dark:text-red-300" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600 dark:text-red-300" name="country" />
    </div>
    <!-- Role -->
    <div class="mb-3">
      <label class="inline-block mb-2">Role</label>
      <vee-field
        as="select"
        name="role"
        class="dark:bg-gray-500 dark:text-white block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Artist">Artist</option>
        <option value="Listener">Listener</option>
      </vee-field>
      <ErrorMessage class="text-red-600 dark:text-red-300" name="role" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="dark:bg-gray-500 dark:text-white w-4 h-4 float-left -ml-6 mt-1 rounded inline-block"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 dark:text-red-300 block" name="tos" />
    </div>
    <button-el
      type="submit"
      text="Submit"
      :disabled="reg_in_submission"
      :bgClr="'violet-500'"
      txtClr="white"
      :hvrBg="'violet-600'"
      hvrTxt="white"
    />
  </vee-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '../stores/user'
import FormInputsEnum from '../utility/FormBase/FormInputsEnum'
import GetFormInputsData from '../utility/FormBase/GetFormInputsData'

const userStore = useUserStore()

const schema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:3|max:100|email',
  age: 'required|min_value:18|max_value:100',
  password: 'required|min:9|max:100|excluded:password',
  confirm_password: 'required|passwords_mismatch:@password',
  country: 'required|country_excluded:Antarctica',
  role: 'required',
  tos: 'tos'
}

const userData = {
  country: 'USA',
  role: 'Artist'
}

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
