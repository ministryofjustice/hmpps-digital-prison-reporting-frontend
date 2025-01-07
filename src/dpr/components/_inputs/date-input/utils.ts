import { Request } from 'express'
import { components } from '../../../types/api'
import { DateFilterValue, FilterValue } from '../../_filters/types'
import StartEndDatetUtils from '../start-end-date/utils'

const setDateValueWithinMinMax = (filter: components['schemas']['FilterDefinition']) => {
  const { defaultValue, min, max } = filter
  let dateValue
  if (defaultValue) {
    dateValue = defaultValue
    if (min) dateValue = StartEndDatetUtils.compareMin(min, dateValue)
    if (max) dateValue = StartEndDatetUtils.compareMax(max, dateValue)
  }
  return dateValue
}

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const dateValue = <string>req.query[`${prefix}${filter.name}`]
  const { min } = <DateFilterValue>filter
  const { max } = <DateFilterValue>filter
  return dateValue || min || max || '1977-05-25'
}

const getFilterFromDefinition = (filter: components['schemas']['FilterDefinition'], filterData: FilterValue) => {
  return {
    ...filterData,
    value: setDateValueWithinMinMax(filter),
    min: filter.min,
    max: filter.max,
  }
}

export default {
  setDateValueWithinMinMax,
  getFilterFromDefinition,
  setValueFromRequest,
}
