import { RequestHandler } from 'express'
import DateRangeInputUtils from '../../../../../../src/dpr/components/_inputs/date-range/utils'
import { components } from '../../../../../../src/dpr/types/api'
import { FilterType } from '../../../../../../src/dpr/components/_filters/filter-input/enum'
import { FilterValue } from '../../../../../../src/dpr/components/_filters/types'

export default class DateRangeController {
  GET: RequestHandler = async (req, res) => {
    const { min, max } = req.query as {
      min?: string
      max?: string
    }
    const filter = {
      type: 'daterange' as components['schemas']['FilterDefinition']['type'],
      mandatory: true,
      defaultValue: '2003-02-01 - 2007-05-04',
      min: min ?? '',
      max: max ?? ''
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
