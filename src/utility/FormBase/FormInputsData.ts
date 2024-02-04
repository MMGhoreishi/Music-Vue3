import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'
import { FormInputsEnum } from './FormInputsEnum'

export const FormInputsData: IFormInputsData[] = [
  {
    id: FormInputsEnum.AddGenre,
    name: 'genreName',
    type: 'text',
    placeholder: 'Enter Genre Name',
    schema: 'required|min:3|max:100|alpha_spaces'
  }
]
