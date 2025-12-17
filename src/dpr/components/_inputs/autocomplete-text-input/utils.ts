import { Request } from 'express'
import { components } from '../../../types/api'
import { FilterValueWithOptions } from '../../_filters/types'

const setValueFromRequest = (filter: FilterValueWithOptions, req: Request, prefix: string) => {
  const value = <string>req.query[`${prefix}${filter.name}`]
  const option = filter.options.find((opt) => opt.value === value)

  let requestfilterValue = value
  let requestOptionValue
  if (option) {
    requestfilterValue = option.text || value
    requestOptionValue = value
  }
  return {
    requestfilterValue,
    requestOptionValue,
  }
}

const getDisplayValue = (filter: components['schemas']['FilterDefinition'], value: string) => {
  const option = filter.staticOptions?.find((opt) => opt.name === value)
  return option ? option.display : value
}

export default {
  setValueFromRequest,
  getDisplayValue,
}
