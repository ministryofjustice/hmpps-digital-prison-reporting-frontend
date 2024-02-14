import { components } from '../../types/api'
import { Column } from './types'

export default {
  getColumns: (fields: Array<components['schemas']['FieldDefinition']>) => {
    return fields.map((f) => {
      return {
        text: f.display,
        value: f.name,
        disabled: f.mandatory, // TODO: Change this to correct attr for mandatory fields
      }
    })
  },

  getSelectedColumns: (columns: Column[], queryCols: string[]) => {
    return columns.filter((column) => column.disabled || queryCols.includes(column.value)).map((field) => field.value)
  },
}
