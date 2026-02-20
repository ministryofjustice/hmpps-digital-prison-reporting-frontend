import { RequestHandler } from 'express'

export default class DashboardListController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/list/view.njk', {
      title: 'List visualisation',
      data: {
        table: {
          head: [{ text: 'Establishment ID' }, { text: 'Wing' }, { text: 'Diet' }, { text: 'Total prisoners' }],
          rows: [
            [{ text: 'ABC' }, { text: 'north' }, { text: 'DietOne' }, { text: '135' }],
            [{ text: 'ABC' }, { text: 'north' }, { text: 'DietTwo' }, { text: '20' }],
            [{ text: 'ABC' }, { text: 'north' }, { text: 'DietThree' }, { text: '106' }],
            [{ text: 'ABC' }, { text: 'north' }, { text: 'DietFour' }, { text: '62' }],
          ],
        },
        ts: '2025/07/31',
      },
    })
  }
}
