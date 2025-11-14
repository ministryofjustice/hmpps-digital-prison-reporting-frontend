import { RequestHandler } from 'express'

export default class DateController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/date/view.njk', {
      title: 'Date input',
      defaultInput: {
        text: 'Field 7',
        name: 'field7',
        type: 'date',
        value: '2005-02-01',
        minimumLength: undefined,
        dynamicResourceEndpoint: undefined,
        mandatory: false,
        min: '2003-02-01',
        max: '2007-05-04',
      },
    })
  }
}
