import { Request } from 'express'
import { FilterValue } from '../../_filters/types'
import { components } from '../../../types/api'

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const queryValue = <string[] | string | undefined>req.query[`${prefix}${filter.name}`]

  let valueArr: string[]
  let valueString: string
  if (queryValue?.length) {
    valueArr = Array.isArray(queryValue) ? queryValue : [queryValue]
    valueString = valueArr.join(',')
  }

  return {
    requestfilterValue: valueString || null,
    requestfilterValues: valueArr || [],
  }
}

const getQueryFromDefinition = (
  filter: components['schemas']['FilterDefinition'],
  name: string,
  filterPrefix: string,
) => {
  const values = filter.defaultValue ? filter.defaultValue.split(',') : []
  return values
    .map((val: string) => {
      return `${filterPrefix}${name}=${val}`
    })
    .join('&')
}

const getMultiselectValues = (f: FilterValue, prefix: string) => {
  const MAX_VALUES = 3
  const splitValues = (<string>f.value).split(',')
  let displayValue = splitValues
    .map((v) => {
      const displayOption = f.options.find((opt) => opt.value === v)
      return displayOption.text
    })
    .filter((v, i) => {
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

export default {
  getQueryFromDefinition,
  setValueFromRequest,
  getMultiselectValues,
}
