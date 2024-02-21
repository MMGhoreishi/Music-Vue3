interface IFormElementsData {
  name: string
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'time'
    | 'date'
    | 'password'
    | 'select'
    | 'checkbox'
    | 'textarea'
  placeholderLabel: string
  schema: string
  options?: string[]
  defaultValue?: string
}

export default IFormElementsData
