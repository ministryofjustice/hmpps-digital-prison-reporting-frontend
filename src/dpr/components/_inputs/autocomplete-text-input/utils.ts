import { Request } from 'express'
import { FilterValueWithOptions } from '../../_filters/types'

const setValueFromRequest = (filter: FilterValueWithOptions, req: Request, prefix: string) => {
  const value = <string>req.query[`${prefix}${filter.name}`]
  const option = filter.options.find((opt) => opt.value === value)
  return option ? option.text : value
}

export default {
  setValueFromRequest,
}
