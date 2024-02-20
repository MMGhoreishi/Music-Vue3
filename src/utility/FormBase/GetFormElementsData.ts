import IFormElementsData from './IFormElementsData'
import FormElementsData from './FormElementsData'
import FormElementsEnum from './FormElementsEnum'
import ISelectsEl from './ISelectsEl'

const GetFormElementsData = (
  enumValues: FormElementsEnum[],
  selectsEl?: ISelectsEl[]
): IFormElementsData[] => {
  const formInputsData: IFormElementsData[] = []

  if (selectsEl)
    for (let i = 0; i < selectsEl.length; i++) {
      FormElementsData[selectsEl[i].selectOtionsEnumKey].options = selectsEl[i].selectOptions
    }

  for (let i = 0; i < enumValues.length; i++) {
    formInputsData.push(FormElementsData[Number(enumValues[i])])
  }

  return formInputsData
}

export default GetFormElementsData
