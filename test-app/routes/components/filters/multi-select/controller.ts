import { RequestHandler } from 'express'

export default class MultiSelectController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/multiselect/view.njk', {
      title: 'Autocomplete input',
      defaultInput: {
        text: 'Multi-select input',
        name: 'multiselect1',
        type: 'multiselect',
        value: 'value2,value3',
        options: [
          { value: 'value1.1', text: 'Value 1.1' },
          { value: 'value2.1', text: 'Value 2.1' },
          { value: 'value3.1', text: 'Value 3.1' },
          { value: 'value4.1', text: 'Value 4.1' },
        ],
        values: ['value2', 'value3'],
      },
      scroll: {
        text: 'Multi-select input with scroll',
        name: 'multiselect2',
        type: 'multiselect',
        value: 'value3,value8,value10',
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
        values: ['value3', 'value8', 'value10'],
      },
    })
  }
}
