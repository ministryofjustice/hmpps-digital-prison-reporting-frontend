import { components } from '../../types/api'

export default {
  getColumns: (fields: Array<components['schemas']['FieldDefinition']>) => {
    return fields.map((f) => {
      return {
        text: f.display,
        value: f.name,
        disabled: f.mandatory,
      }
    })
  },

  getSelectedColumns: (columns: Array<components['schemas']['FieldDefinition']>, queryCols: string[]) => {
    return columns.filter((column) => column.mandatory || queryCols.includes(column.name)).map((field) => field.name)
  },
}
