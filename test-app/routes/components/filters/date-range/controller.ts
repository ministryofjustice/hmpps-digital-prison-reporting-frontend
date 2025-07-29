import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/date-range/view.njk', {
      title: 'Date range input',
      defaultInput: {
        text: 'Date-range',
        name: 'date-range',
        value: {
          start: '2003-02-01',
          end: '2007-05-04',
        },
      },
      minMax: {
        text: 'Date-range, with min and max',
        name: 'date-range-min-max',
        value: {
          start: '2003-02-01',
          end: '2007-05-04',
        },
        min: '2003-02-01',
        max: '2007-05-04',
      },
      relativeRange: {
        text: 'Relative Date range picker',
        name: 'relative-date-range-picker',
        value: {
          start: '2003-02-01',
          end: '2007-05-04',
        },
        relativeOptions: [
          { value: null, text: 'None' },
          { value: 'yesterday', text: 'Yesterday' },
          { value: 'tomorrow', text: 'Tomorrow' },
          { value: 'last-week', text: 'Last week' },
          { value: 'next-week', text: 'Next week' },
          { value: 'last-month', text: 'Last month' },
          { value: 'next-month', text: 'Next-month' },
        ],
      },
    })
  }
}
