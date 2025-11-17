import { RequestHandler } from 'express'
import DateRangeInputUtils from '../../../../../../dist/dpr/components/_inputs/date-range/utils'
import { components } from '../../../../../../dist/dpr/types/api'
import { FilterType } from '../../../../../../dist/dpr/components/_filters/filter-input/enum'
import { FilterValue } from '../../../../../../dist/dpr/components/_filters/types'

export default class DateRangeController {
  GET: RequestHandler = async (_req, res) => {
    const filter = {
      type: 'daterange' as components['schemas']['FilterDefinition']['type'],
      mandatory: true,
      defaultValue: '2003-02-01 - 2007-05-04',
    }

    const filterData: FilterValue = {
      text: 'Default Date-range',
      name: 'default-date-range',
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
