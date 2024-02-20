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
}

export default IFormElementsData
