import { RequestHandler } from 'express'

export default class AutocompleteController {
  GET: RequestHandler = async (_req, res) => {
    const filters = [
      {
        text: 'Autocompletemulti',
        name: 'autocompletemulti',
        type: 'autocompletemulti',
        mandatory: true,
        options: [
          {
            value: 'fezzick',
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
      title: 'Autocompletemulti',
      filters,
    })
  }
}
