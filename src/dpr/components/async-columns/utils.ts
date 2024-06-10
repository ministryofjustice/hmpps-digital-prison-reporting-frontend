import { components } from '../../types/api'
import { Column, Columns } from './types'

/**
 * Gets the selected column values and adds the mandatory ones
 *
 * @param {*} columns
 * @param {string[]} queryColumns
 */
const getColumnValues = (columns: Columns, queryColumns: string[]) => {
  const mandatoryColumns: string[] = columns.options
    .filter((col: Column) => {
      return col.disabled && columns.value.includes(col.value)
    })
    .map((col: Column) => col.value)

  return [...mandatoryColumns, ...queryColumns]
}

export default {
  /**
   * Converts the columns from a DPD into a column readable format
   *
   * @param {Array<components['schemas']['FieldDefinition']>} fields
   */
  getColumns: (fields: Array<components['schemas']['FieldDefinition']>, reqColumns: string[]) => {
    const value: string[] = []
    const options: Column[] = fields.map((field) => {
      if (field.visible) value.push(field.name)

      return {
        text: field.display,
        value: field.name,
        disabled: field.mandatory,
      }
    })

    const columns: Columns = {
      name: 'columns',
      options,
      value,
    }

    if (reqColumns) {
      columns.value = getColumnValues(columns, reqColumns)
    }

    return columns
  },
}
