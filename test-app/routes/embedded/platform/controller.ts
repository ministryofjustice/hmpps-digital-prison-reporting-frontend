import { RequestHandler } from 'express'
import { Services } from '../../../../src/dpr/types/Services'
import CatalogueUtils from '../../../../src/dpr/components/_catalogue/catalogue/utils'
import UserReportsListUtils from '../../../../src/dpr/components/user-reports/utils'

export default class PlatformController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    res.locals['csrfToken'] = 'csrfToken'

    const args = { res, req, services: this.services }
    const catalogue = await CatalogueUtils.initCatalogue(args)
    const userReportsLists = await UserReportsListUtils.initUserReports({ ...args, maxRows: 3 })

    const dprMyReportListConfig = {
      headings: [
        {
          name: 'Product',
          classes: 'dpr-my-reports__cell--title',
        },
        {
          name: 'Filters',
          classes: 'dpr-my-reports__cell--filters',
        },
        {
          name: 'Status',
          classes: 'dpr-my-reports__cell--status',
        },
        {
          name: 'Actions',
          classes: 'dpr-my-reports__cell--actions',
        },
      ],
      items: [
        {
          title: {
            productName: 'productName',
            reportName: 'reportName',
            reportType: 'reportType',
            timestamp: 'timestamp',
          },
          desription: 'desription desription desription desription',
          filters: {
            prerequest: [
              { name: 'one', value: 'one' },
              { name: 'two', value: 'two' },
            ],
            interactive: [
              { name: 'one', value: 'one' },
              { name: 'two', value: 'two' },
            ],
          },
          status: 'REQUESTED',
          actions: {
            remove: {
              action: 'action',
              csrfToken: 'csrfToken',
            },
            refresh: {
              href: 'refreshHref',
            },
            retry: {
              href: 'retryHref',
            },
            view: {
              href: 'retryHref',
              reportType: 'report',
            },
          },
        },
        {
          title: {
            productName: 'productName',
            reportName: 'reportName',
            reportType: 'reportType',
            timestamp: 'timestamp',
          },
          desription: 'desription desription desription desription',
          filters: {
            prerequest: [
              { name: 'one', value: 'one' },
              { name: 'two', value: 'two' },
            ],
            interactive: [
              { name: 'one', value: 'one' },
              { name: 'two', value: 'two' },
            ],
          },
          status: 'REQUESTED',
          actions: {
            remove: {
              action: 'action',
              csrfToken: 'csrfToken',
            },
            refresh: {
              href: 'refreshHref',
            },
            retry: {
              href: 'retryHref',
            },
            view: {
              href: 'retryHref',
              reportType: 'report',
            },
          },
        },
      ],
    }

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
      dprMyReportListConfig,
    })
  }
}
