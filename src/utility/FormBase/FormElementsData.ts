import FormInputsEnum from './FormElementsEnum'
import IFormElementsData from './IFormElementsData'

const FormElementsData: { [id: number]: IFormElementsData } = {
  [FormInputsEnum.AddGenre]: {
    name: 'genreName',
    type: 'text',
    placeholder: 'Genre Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  },
  [FormInputsEnum.Password]: {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    schema: 'required|min:9|max:100'
  },
  [FormInputsEnum.ConfirmPassword]: {
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Confirm Password',
    schema: 'required|passwords_mismatch:@password'
  },
  [FormInputsEnum.Country]: {
    name: 'country',
    type: 'select',
    placeholder: 'Choose Country',
    schema: 'required|country_excluded:Antarctica',
    options: ['USA', 'Mexico', 'Germany', 'Antarctica']
  },
  [FormInputsEnum.Role]: {
    name: 'role',
    type: 'select',
    placeholder: 'Choose Role',
    schema: 'required',
    options: ['Artist', 'Listener']
  },
  [FormInputsEnum.AcceptTermsOfService]: {
    name: 'tos',
    type: 'checkbox',
    placeholder: 'Accept Terms Of Service',
    schema: 'tos',
    label: 'Accept terms of service'
  },
  [FormInputsEnum.Name]: {
    name: 'name',
    type: 'text',
    placeholder: 'Enter Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  },
  [FormInputsEnum.Age]: {
    name: 'age',
    type: 'number',
    placeholder: 'Enter Age',
    schema: 'required|min_value:18|max_value:100'
  },
  [FormInputsEnum.Email]: {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    schema: 'required|min:3|max:100|email'
  }
}

export default FormElementsData
