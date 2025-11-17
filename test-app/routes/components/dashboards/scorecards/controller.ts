import { RequestHandler } from 'express'

import mockScorecardData from '../../../../mocks/mockScoreCards/mockScorecards'

export default class ScorecardsController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/dashboards/scorecards/view.njk', {
      title: 'Scorecards',
      data: mockScorecardData,
    })
  }
}
