import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'
import { FormInputsData } from './FormInputsData'
import { FormInputsEnum } from './FormInputsEnum'

export const GetFormInputsData = (enumValues: FormInputsEnum[]): IFormInputsData[] => {
  const formInputsData: IFormInputsData[] = []

  for (let i = 0; i < enumValues.length; i++) {
    formInputsData.push(FormInputsData.filter((item) => item.id === enumValues[i])[0])
  }

  return formInputsData
}
