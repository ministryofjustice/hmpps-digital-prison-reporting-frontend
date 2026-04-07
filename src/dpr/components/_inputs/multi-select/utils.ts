import { Request } from 'express'
import { MultiselectFilterValue } from '../../_filters/types'
import { components } from '../../../types/api'
import { defaultFilterValue } from '../../../utils/Personalisation/types'

export const setValueFromRequest = (
  filter: MultiselectFilterValue,
  req: Request,
  prefix: string,
): {
  requestfilterValue: MultiselectFilterValue['value']
  requestfilterValues?: MultiselectFilterValue['values']
} => {
  const queryValue = <string[] | string | undefined>req.query[`${prefix}${filter.name}`]

  let valueArr: string[] = []
  let valueString = ''
  if (queryValue?.length) {
    valueArr = Array.isArray(queryValue) ? queryValue : [queryValue]
    valueString = valueArr.join(',')
  }

  return {
    requestfilterValue: valueString || null,
    requestfilterValues: valueArr,
  }
}

export const getQueryFromDefinition = (filter: components['schemas']['FilterDefinition'], name: string): string => {
  if (!filter.defaultValue) return ''

  const params = new URLSearchParams()
  appendMultiSelectValues(params, name, filter.defaultValue)
  return params.toString()
}

export const appendMultiSelectFromDefinition = (
  params: URLSearchParams,
  fieldName: string,
  filter: components['schemas']['FilterDefinition'],
) => {
  if (!filter.defaultValue) return

  appendMultiSelectValues(params, fieldName, filter.defaultValue)
}

export const appendMultiSelectValues = (params: URLSearchParams, fieldName: string, value: string) => {
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
    .forEach((val) => {
      params.append(`filters.${fieldName}`, val)
    })
}

export const getMultiselectValues = (f: MultiselectFilterValue, prefix: string) => {
  const MAX_VALUES = 3
  const splitValues = (<string>f.value).split(',')
  let displayValue = splitValues
    .map((v) => {
      const displayOption = f.options?.find((opt) => opt.value === v)
      return displayOption ? displayOption.text : null
    })
    .filter((_v, i) => {
      return i < MAX_VALUES
    })
    .join(', ')

  displayValue =
    splitValues.length > MAX_VALUES ? `${displayValue} + ${splitValues.length - MAX_VALUES} more` : displayValue

  const value = splitValues.map((v) => `"${v}"`)
  const key = [`${prefix}${f.name}`]

  return {
    key,
    value,
    displayValue,
  }
}

export const setFilterValuesFromSavedDefault = (
  filter: MultiselectFilterValue,
  hasDefaults: boolean,
  defaultValue?: defaultFilterValue,
) => {
  let value = hasDefaults ? '' : filter.value
  value = defaultValue ? <string>defaultValue.value : value
  let values = hasDefaults ? [] : filter.values
  values = defaultValue ? (<string>defaultValue.value).split(',') : values
  return {
    ...filter,
    value,
    values,
  }
}

export default {
  getQueryFromDefinition,
  setValueFromRequest,
  getMultiselectValues,
  setFilterValuesFromSavedDefault,
}
