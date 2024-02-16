import IFormElementsData from './IFormElementsData'
import FormElementsData from './FormElementsData'
import FormElementsEnum from './FormElementsEnum'

const GetFormElementsData = (enumValues: FormElementsEnum[]): IFormElementsData[] => {
  const formInputsData: IFormElementsData[] = []

  for (let i = 0; i < enumValues.length; i++) {
    formInputsData.push(FormElementsData[Number(enumValues[i])])
  }
  return formInputsData
}

export default GetFormElementsData
