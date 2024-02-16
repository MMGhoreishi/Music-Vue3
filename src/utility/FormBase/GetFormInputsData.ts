import IFormInputsData from '../FormBase/IFormInputsData'
import FormInputsData from '../FormBase/FormInputsData'
import FormInputsEnum from '../FormBase/FormInputsEnum'

const GetFormInputsData = (enumValues: FormInputsEnum[]): IFormInputsData[] => {
  const formInputsData: IFormInputsData[] = []

  for (let i = 0; i < enumValues.length; i++) {
    formInputsData.push(FormInputsData[Number(enumValues[i])])
  }
  return formInputsData
}

export default GetFormInputsData
