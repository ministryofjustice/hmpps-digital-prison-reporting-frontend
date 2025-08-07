import { RequestHandler } from 'express'
import dayjs from 'dayjs'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const today = dayjs().format('YYYY-MM-DD').toString()
    const future = dayjs().add(40, 'day').format('YYYY-MM-DD').toString()

    const filters = [
      {
        text: 'Relative Date-range with min & max',
        name: 'relative-date-range-min-max',
        type: 'daterange',
        value: {
          start: today,
          end: future,
        },
        min: today,
        max: future,
        mandatory: true,
        relativeOptions: [
          { value: 'none', text: 'None' },
          { value: 'yesterday', text: 'Yesterday' },
          { value: 'tomorrow', text: 'Tomorrow' },
          { value: 'last-week', text: 'Last week' },
          { value: 'next-week', text: 'Next week' },
          { value: 'last-month', text: 'Last month' },
          { value: 'next-month', text: 'Next month' },
        ],
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
