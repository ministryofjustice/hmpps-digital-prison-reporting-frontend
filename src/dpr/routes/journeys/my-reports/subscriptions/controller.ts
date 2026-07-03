import { RequestHandler } from 'express'
import { subscribe } from '../../../../components/subscription/subscribe/utils'
import { unsubscribe } from '../../../../components/subscription/unsubscribe/utils'
import { Services } from '../../../../types/Services'
import { getAllMyReports } from '../utils'
import { initSubscribed } from '../../../../components/my-reports/utils'
import { captureDprError } from '../../../../utils/captureError'
import LocalsHelper from '../../../../utils/localsHelper'

class SubscribedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    await unsubscribe(req, res, this.services)

    res.locals['subscriptions'] = await getAllMyReports('subscriptions', this.services, dprUser.id)

    try {
      const maxRows = req.body?.maxRows !== undefined ? Number(req.body.maxRows) : undefined

      const viewModel = await initSubscribed(req, res, {
        ...(maxRows && { maxRows }),
      })

      return res.render('dpr/components/my-reports/my-reports-list/view.njk', { viewModel }, (err, html) => {
        if (err) return res.sendStatus(500)
        return res.type('text/html').send(html)
      })
    } catch (error) {
      captureDprError(error, 'Failed to refresh list after removal')

      return res.sendStatus(500)
    }
  }

  // Subscribe action
  Subscribe: RequestHandler = async (req, res) => {
    const { returnTo } = await subscribe(req, res, this.services)

    res.redirect(returnTo)
  }

  // Unsubscribe action
  Unsubscribe: RequestHandler = async (req, res) => {
    const { returnTo } = await unsubscribe(req, res, this.services)

    res.redirect(returnTo)
  }
}

export { SubscribedReportsController }
export default SubscribedReportsController
