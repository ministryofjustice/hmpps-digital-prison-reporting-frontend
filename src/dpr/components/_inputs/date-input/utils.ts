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
  const { min, max, mandatory } = <DateFilterValue>filter
  const dateValue = <string>req.query[`${prefix}${filter.name}`]
  let value = dateValue
  if (mandatory && !dateValue) {
    value = min || max || '1977-05-25'
  }
  return value
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
