import { RequestHandler } from 'express'

export default class AutocompleteController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Autocomplete',
        name: 'autocomplete',
        type: 'autocomplete',
        minimumLength: 3,
        mandatory: true,
        options: [
          {
            value: 'Fezzick',
            text: 'Fezzick',
          },
          {
            value: 'Inigo Montoya',
            text: 'Inigo Montoya',
          },
          {
            value: 'PrHu',
            text: 'Prince Humperdink',
          },
          {
            value: 'Princess Buttercup',
            text: 'Princess Buttercup',
          },
          {
            value: 'Westley',
            text: 'Westley',
          },
        ],
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Autocomplete input',
      filters,
    })
  }
}
