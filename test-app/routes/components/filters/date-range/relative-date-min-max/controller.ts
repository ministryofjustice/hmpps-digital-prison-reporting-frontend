import { RequestHandler } from 'express'
import dayjs from 'dayjs'
import DateRangeInputUtils from '../../../../../../dist/dpr/components/_inputs/date-range/utils'
import { components } from '../../../../../../dist/dpr/types/api'
import { FilterType } from '../../../../../../dist/dpr/components/_filters/filter-input/enum'
import { FilterValue } from '../../../../../../dist/dpr/components/_filters/types'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const filter = {
      type: 'daterange' as components['schemas']['FilterDefinition']['type'],
      min: dayjs().format('YYYY-MM-DD').toString(),
      max: dayjs().add(2, 'month').format('YYYY-MM-DD').toString(),
      mandatory: true,
    }

    const filterData: FilterValue = {
      text: 'Relative Date-range with min & max',
      name: 'relative-date-range-min-max',
      type: FilterType.dateRange,
      mandatory: true,
      value: { start: '', end: '' },
    }
    const dateRangeFilterData = DateRangeInputUtils.getFilterFromDefinition(filter, filterData)
    const filters = [dateRangeFilterData]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
