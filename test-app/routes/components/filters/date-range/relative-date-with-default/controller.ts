import { RequestHandler } from 'express'
import DateRangeInputUtils from '../../../../../../src/dpr/components/_inputs/date-range/utils'
import { components } from '../../../../../../src/dpr/types/api'
import { FilterType } from '../../../../../../src/dpr/components/_filters/filter-input/enum'
import { FilterValue } from '../../../../../../src/dpr/components/_filters/types'

export default class DateRangeController {
  GET: RequestHandler = async (_req, res) => {
    const defaultQuickFilterValue: components['schemas']['FilterDefinition']['defaultQuickFilterValue'] =
      'last-seven-days'
    const filter: components['schemas']['FilterDefinition'] = {
      type: 'daterange' as components['schemas']['FilterDefinition']['type'],
      mandatory: true,
      defaultQuickFilterValue,
    }

    const filterData: FilterValue = {
      text: 'Relative date-range with default',
      name: 'relative-date-range-with-default',
      type: FilterType.dateRange,
      mandatory: true,
      value: null,
    }

    const dateRangeFilterData = DateRangeInputUtils.getFilterFromDefinition(filter, filterData)
    const filters = [dateRangeFilterData]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
