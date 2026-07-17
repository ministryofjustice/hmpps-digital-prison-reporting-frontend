import { RequestHandler } from 'express'
import { subscribe } from '../../../../components/subscription/subscribe/utils'
import { unsubscribe } from '../../../../components/subscription/unsubscribe/utils'
import { Services } from '../../../../types/Services'

class SubscribedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
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
