import { RequestHandler } from 'express'

export default class MultiSelectController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Multiselect',
        name: 'multiselect',
        type: 'multiselect',
        mandatory: true,
        options: [
          {
            value: 'value8.1',
            text: 'Value 8.1',
          },
          {
            value: 'value8.2',
            text: 'Value 8.2',
          },
          {
            value: 'value8.3',
            text: 'Value 8.3',
          },
          {
            value: 'value8.4',
            text: 'Value 8.4',
          },
        ],
      },
      {
        text: 'Multiselect, long options list',
        name: 'multiselect-long',
        type: 'multiselect',
        mandatory: false,
        options: [
          { value: 'value1.2', text: 'Value 1.2' },
          { value: 'value2.2', text: 'Value 2.2' },
          { value: 'value3.2', text: 'Value 3.2' },
          { value: 'value4.2', text: 'Value 4.2' },
          { value: 'value5.2', text: 'Value 5.2' },
          { value: 'value6.2', text: 'Value 6.2' },
          { value: 'value7.2', text: 'Value 7.2' },
          { value: 'value8.2', text: 'Value 8.2' },
          { value: 'value9.2', text: 'Value 9.2' },
          { value: 'value10.2', text: 'Value 10.2' },
        ],
      },
    ]
    res.render('views/pages/components/filters/view.njk', {
      title: 'Multiselect input',
      filters,
    })
  }
}
