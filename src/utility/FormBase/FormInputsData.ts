import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'
import { FormInputsEnum } from './FormInputsEnum'

export const FormInputsData: IFormInputsData[] = [
  {
    id: FormInputsEnum.AddGenre,
    name: 'genreName',
    type: 'text',
    placeholder: 'Genre Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  },
  {
    id: FormInputsEnum.Password,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    schema: 'required|min:9|max:100'
  },
  {
    id: FormInputsEnum.Email,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    schema: 'required|min:3|max:100|email'
  }
]
