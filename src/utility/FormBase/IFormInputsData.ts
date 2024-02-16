interface IFormInputsData {
  name: string
  type: 'text' | 'number' | 'email' | 'time' | 'date' | 'password' | 'select' | 'checkbox'
  placeholder: string
  schema: string
  options?: string[]
  label?: string
}

export default IFormInputsData
