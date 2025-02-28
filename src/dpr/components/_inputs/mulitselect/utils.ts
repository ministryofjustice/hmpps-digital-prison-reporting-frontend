import { Request } from 'express'
import { FilterValue } from '../../_filters/types'

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query

  const valueArr = <string[]>req.query[`${prefix}${filter.name}`]
  const valueString = valueArr ? valueArr.join(',') : ''
  const defaultValue = preventDefault ? null : filter.value
  const defaultValues = preventDefault ? [] : (<string>filter.value).split(',')

  return {
    requestfilterValue: valueString || defaultValue,
    requestfilterValues: valueArr || defaultValues,
  }
}

export default {
  setValueFromRequest,
}
