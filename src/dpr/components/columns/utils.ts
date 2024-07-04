import { components } from '../../types/api'
import { Column, Columns } from './types'

const distinct = (values: string[], value: string) => (values.includes(value) ? values : values.concat(value))
const mandatoryColumns = (fields: Array<components['schemas']['FieldDefinition']>) =>
  fields.filter((field) => field.mandatory).map((field) => field.name)
const visibleColumns = (fields: Array<components['schemas']['FieldDefinition']>) =>
  fields.filter((field) => field.visible).map((field) => field.name)

const ensureMandatoryColumns = (fields: Array<components['schemas']['FieldDefinition']>, queryColumns: string[]) =>
  [...mandatoryColumns(fields), ...queryColumns].reduce(distinct, [])

export default {
  /**
   * Converts the columns from a DPD into a column readable format
   *
   * @param {Array<components['schemas']['FieldDefinition']>} fields
   * @param requestedColumns
   */
  getColumns: (fields: Array<components['schemas']['FieldDefinition']>, requestedColumns: string[] = null): Columns => {
    const options: Column[] = fields.map((field) => ({
      text: field.display,
      value: field.name,
      disabled: field.mandatory,
    }))

    return {
      name: 'columns',
      options,
      value: ensureMandatoryColumns(fields, requestedColumns ?? visibleColumns(fields)),
    }
  },

  ensureMandatoryColumns,
}
