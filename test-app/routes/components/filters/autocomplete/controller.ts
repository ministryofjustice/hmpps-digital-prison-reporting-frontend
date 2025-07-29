import { RequestHandler } from 'express'

export default class AutocompleteController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/autocomplete/view.njk', {
      title: 'Autocomplete input',
      options: {
        id: 'people',
        name: 'people',
        items: [
          { text: 'Magnar Azure' },
          { text: 'Quinctus Zainabu' },
          { text: 'Paraskevi Munroe' },
          { text: 'Gundega Johanneke' },
          { text: 'Konjit Taina' },
          { text: 'Lennie Alma' },
          { text: 'Murad Ali' },
        ],
        labelText: 'People',
        minimumlength: 1,
      },
    })
  }
}
