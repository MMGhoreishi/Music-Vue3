import FormInputsEnum from './FormElementsEnum'
import IFormElementsData from './IFormElementsData'

const FormElementsData: { [id: number]: IFormElementsData } = {
  [FormInputsEnum.AddGenre]: {
    name: 'genreName',
    type: 'text',
    placeholderLabel: 'Genre Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  },
  [FormInputsEnum.Password]: {
    name: 'password',
    type: 'password',
    placeholderLabel: 'Password',
    schema: 'required|min:9|max:100'
  },
  [FormInputsEnum.ConfirmPassword]: {
    name: 'confirm_password',
    type: 'password',
    placeholderLabel: 'Confirm Password',
    schema: 'required|passwords_mismatch:@password'
  },
  [FormInputsEnum.Country]: {
    name: 'country',
    type: 'select',
    placeholderLabel: 'Choose Country',
    schema: 'required|country_excluded:Antarctica',
    options: ['USA', 'Mexico', 'Germany', 'Antarctica']
  },
  [FormInputsEnum.Role]: {
    name: 'role',
    type: 'select',
    placeholderLabel: 'Choose Role',
    schema: 'required',
    options: ['Artist', 'Listener']
  },
  [FormInputsEnum.AcceptTermsOfService]: {
    name: 'tos',
    type: 'checkbox',
    placeholderLabel: 'Accept Terms Of Service',
    schema: 'tos'
  },
  [FormInputsEnum.Name]: {
    name: 'name',
    type: 'text',
    placeholderLabel: 'Enter Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  },
  [FormInputsEnum.Age]: {
    name: 'age',
    type: 'number',
    placeholderLabel: 'Enter Age',
    schema: 'required|min_value:18|max_value:100'
  },
  [FormInputsEnum.Email]: {
    name: 'email',
    type: 'email',
    placeholderLabel: 'Email',
    schema: 'required|min:3|max:100|email'
  },
  [FormInputsEnum.Comment]: {
    name: 'comment',
    type: 'textarea',
    placeholderLabel: 'Your comment here...',
    schema: 'required|min:3'
  },
  [FormInputsEnum.ModifiedName]: {
    name: 'modified_name',
    type: 'text',
    placeholderLabel: 'Enter Song Title',
    schema: 'songTitle'
  },
  [FormInputsEnum.Genres]: {
    name: 'genres',
    type: 'select',
    placeholderLabel: 'Choose Genre',
    schema: 'required',
    options: []
  }
}

export default FormElementsData
