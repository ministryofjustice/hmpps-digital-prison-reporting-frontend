import { Request } from 'express'
import { components } from '../../../../../types/api'
import { Column, Columns } from './types'
import { normalizeQueryStringArray } from '../../../../../utils/queryMappers'

export const mandatoryColumns = (fields: Array<components['schemas']['FieldDefinition']>) =>
  fields.filter((field) => field.mandatory).map((field) => field.name)

export const visibleColumns = (fields: Array<components['schemas']['FieldDefinition']>) =>
  fields.filter((field) => field.visible).map((field) => field.name)

export const ensureMandatoryColumns = (
  fields: Array<components['schemas']['FieldDefinition']>,
  queryColumns?: string[] | string,
) => {
  let queryCols
  if (queryColumns) {
    queryCols = Array.isArray(queryColumns) ? queryColumns : [queryColumns]
  }

  const visibleCols = visibleColumns(fields)
  const mandatoryCols = mandatoryColumns(fields)

  const columns = queryCols || visibleCols
  return Array.from(new Set([...mandatoryCols, ...columns]))
}

/**
 * Converts the columns from a DPD into a column readable format
 *
 * @param specification
 * @param requestedColumns
 */
export const getColumns = (specification: components['schemas']['Specification'], req: Request): Columns => {
  const requestedColumns = normalizeQueryStringArray(<string[] | string | undefined>req.query['columns'])
  const { fields } = specification

  const options: Column[] = fields.map((field) => ({
    text: field.display,
    value: field.name,
    disabled: field.mandatory,
  }))

  return {
    name: 'columns',
    options,
    text: 'Select report columns',
    value: ensureMandatoryColumns(fields, requestedColumns),
  }
}

export default {
  getColumns,
  ensureMandatoryColumns,
  mandatoryColumns,
}
