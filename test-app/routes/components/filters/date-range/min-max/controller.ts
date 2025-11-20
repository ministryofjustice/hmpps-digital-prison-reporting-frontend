import { RequestHandler } from 'express'
import DateRangeInputUtils from '../../../../../../dist/dpr/components/_inputs/date-range/utils'
import { components } from '../../../../../../dist/dpr/types/api'
import { FilterType } from '../../../../../../dist/dpr/components/_filters/filter-input/enum'
import { FilterValue } from '../../../../../../dist/dpr/components/_filters/types'

export default class DateRangeController {
  GET: RequestHandler = async (_req, res) => {
    const filter = {
      type: 'daterange' as components['schemas']['FilterDefinition']['type'],
      min: '2003-02-01',
      max: '2007-05-04',
      mandatory: true,
    }

    const filterData: FilterValue = {
      text: 'Date-range, with min and max',
      name: 'date-range-min-max',
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
