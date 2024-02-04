export interface IFormInputsData {
  id: number
  name: string
  type: 'text' | 'number' | 'email' | 'time' | 'date'
  placeholder: string
  schema: string
}
