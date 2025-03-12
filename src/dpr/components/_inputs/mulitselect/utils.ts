import { Request } from 'express'
import { FilterValue } from '../../_filters/types'
import { components } from '../../../types/api'

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query
  const queryValue = <string[] | string | undefined>req.query[`${prefix}${filter.name}`]

  let valueArr: string[]
  let valueString: string
  if (queryValue?.length) {
    valueArr = Array.isArray(queryValue) ? queryValue : [queryValue]
    valueString = valueArr.join(',')
  }
  const defaultValue = preventDefault ? null : filter.value
  let defaultValues = filter.value ? (<string>filter.value).split(',') : []
  defaultValues = preventDefault ? [] : defaultValues

  return {
    requestfilterValue: valueString || defaultValue || null,
    requestfilterValues: valueArr || defaultValues || [],
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

export default {
  getQueryFromDefinition,
  setValueFromRequest,
}
