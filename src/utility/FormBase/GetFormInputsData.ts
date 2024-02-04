import { IFormInputsData } from '../../contracts/FormBase/IFormInputsData'
import { FormInputsData } from './FormInputsData'
import { FormInputsEnum } from './FormInputsEnum'

export const GetFormInputsData = (enumValues: FormInputsEnum[]): IFormInputsData[] => {
  const formInputsData: IFormInputsData[] = []

  for (let i = 0; i < enumValues.length; i++) {
    if (FormInputsData[i].id === enumValues[i]) formInputsData.push(FormInputsData[i])
  }
  return formInputsData
}
