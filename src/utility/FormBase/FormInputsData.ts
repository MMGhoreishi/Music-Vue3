import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'
import { FormInputsEnum } from './FormInputsEnum'
import helper from '../../includes/helper'

export const FormInputsData: IFormInputsData[] = []

const { assignArrayByEnumValues } = helper

assignArrayByEnumValues(FormInputsData, FormInputsEnum.AddGenre, {
  name: 'genreName',
  type: 'text',
  placeholder: 'Genre Name',
  schema: 'required|min:3|max:100|alpha_spaces'
})

assignArrayByEnumValues(FormInputsData, FormInputsEnum.Email, {
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  schema: 'required|min:3|max:100|email'
})

assignArrayByEnumValues(FormInputsData, FormInputsEnum.Password, {
  name: 'password',
  type: 'password',
  placeholder: 'Password',
  schema: 'required|min:9|max:100'
})
