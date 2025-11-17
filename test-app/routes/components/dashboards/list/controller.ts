import { RequestHandler } from 'express'

export default class DashboardListController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/list/view.njk', {
      title: 'List visualisation',
      data: {
        table: {
          head: [{ text: 'Establishment ID' }, { text: 'Wing' }, { text: 'Diet' }, { text: 'Total prisoners' }],
          rows: [
            [{ text: 'MDI' }, { text: 'north' }, { text: 'Vegetarian' }, { text: '135' }],
            [{ text: 'MDI' }, { text: 'north' }, { text: 'Pescatarian' }, { text: '20' }],
            [{ text: 'MDI' }, { text: 'north' }, { text: 'Vegan' }, { text: '106' }],
            [{ text: 'MDI' }, { text: 'north' }, { text: 'Omnivore' }, { text: '62' }],
          ],
        },
        ts: '2025/07/31',
      },
    })
  }
}
