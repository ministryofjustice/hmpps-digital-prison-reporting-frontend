/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import * as axe from 'axe-core'

function terminalLog(violations: axe.Result[]) {
  const violationData = violations.map(({ id, impact, help, helpUrl, nodes }) => ({
    id,
    impact,
    help,
    helpUrl,
    nodes: nodes.length,
  }))

  if (violationData.length > 0) {
    cy.task('log', 'Violation summary')
    cy.task('table', violationData)

    cy.task('log', 'Violation detail')
    cy.task('log', '----------------')

    violations.forEach((v) => {
      v.nodes.forEach((node) => {
        cy.task('log', node.failureSummary)
        cy.task('log', `Impact: ${node.impact}`)
        cy.task('log', `Target: ${node.target}`)
        cy.task('log', `HTML: ${node.html}`)
        cy.task('log', '----------------')
      })
    })
  }
}

When(/I navigate to the main page/, () => {
  cy.visit('/')
})

When(/I navigate to the reports page/, () => {
  cy.visit('/embedded/sync')
})

When(/I navigate to the fail page/, () => {
  cy.visit('/embedded/sync/fail', {
    failOnStatusCode: false,
  })
})

When(/I navigate to the search page/, () => {
  cy.visit('/components/search')
})

When(/I navigate to the (method|handler|validation) page/, (page: string) => {
  const type = page.toLowerCase()
  let path = '/embedded/sync/'
  if (type === 'method') {
    path += `${type}?dataProductDefinitionsPath=test-location`
  } else {
    path += type
  }
  cy.visit(`/${path}`)
})

When(/I navigate to the async-home page/, () => {
  cy.visit('/embedded/platform/')
})

When(/I navigate to the async-query page/, () => {
  cy.visit('/embedded/platform/async/report/test-report-3/variantId-1/request')
})

Then(/The text (.+) is displayed on the page/, (text) => {
  cy.get('body').should('contain.text', text)
})

When(
  /I navigate to the (list|list-section-summaries|list-section|parent-child|parent-child-section|row-section|row-section-child|summary|summary-section) template page/,
  (page: string) => {
    const type = page.toLowerCase()
    let path = '/'
    switch (type) {
      case 'list':
        path = 'templates/list-section'
        break
      case 'list-section':
        path = 'templates/list-section'
        break
      case 'list-section-summaries':
        path = 'templates/list-section-summaries'
        break
      case 'parent-child':
        path = '/templates/parent-child'
        break
      case 'parent-child-section':
        path = '/templates/parent-child-section'
        break
      case 'row-section':
        path = '/templates/row-section'
        break
      case 'row-section-child':
        path = '/templates/row-section-child'
        break
      case 'summary':
        path = '/templates/summary'
        break
      case 'summary-section':
        path = '/templates/summary-section'
        break
      default:
        break
    }

    cy.visit(path)
  },
)

When(/I navigate to the (search|catalogue|user-reports) component page/, (page: string) => {
  const type = page.toLowerCase()
  let path = '/'
  switch (type) {
    case 'search':
      path = '/components/search'
      break
    case 'catalogue':
      path = '/components/catalogue'
      break
    case 'user-reports':
      path = '/components/user-reports'
      break
    default:
      break
  }

  cy.visit(path)
})

When(
  /I navigate to the (autocomplete|date|date-range|granular-date-range|multi-select) filter input component page/,
  (page: string) => {
    const type = page.toLowerCase()
    let path = '/'
    switch (type) {
      case 'autocomplete':
        path = '/components/filters/autocomplete'
        break
      case 'date':
        path = '/components/filters/date'
        break
      case 'date-range':
        path = '/components/filters/date-range'
        break
      case 'granular-date-range':
        path = '/components/filters/granular-date-range'
        break
      case 'multi-select':
        path = '/components/filters/multi-select'
        break
      default:
        break
    }

    cy.visit(path)
  },
)

When(/I navigate to the (bar|pie|line|scorecards|list) chart page/, (page: string) => {
  const type = page.toLowerCase()
  let path = '/'
  switch (type) {
    case 'bar':
      path = '/components/dashboards/charts/bar'
      break
    case 'pie':
      path = '/components/dashboards/charts/pie'
      break
    case 'line':
      path = '/components/dashboards/charts/line'
      break
    case 'scorecards':
      path = '/components/dashboards/scorecards'
      break
    case 'list':
      path = '/components/dashboards/list'
      break
    default:
      break
  }

  cy.visit(path)
})

When(
  /I navigate to the platform (home|request|report|dashboard|download-form|download-submitted|missing-report-form|missing-report-submitted|polling|requested-list|viewed-list|bookmarks-list) page/,
  (page: string) => {
    const type = page.toLowerCase()
    let path = '/'
    switch (type) {
      case 'home':
        path = '/embedded/platform/'
        break
      case 'request':
        path = '/embedded/platform/dpr/request-report/report/test-report-3/variantId-1/filters'
        break
      case 'report':
        path = '/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1753863906851/report'
        break
      case 'dashboard':
        path =
          'http://localhost:3010/embedded/platform/dpr/view-report/async/dashboard/test-report-1/test-dashboard-8/tblId_1730302242487/dashboard?filters.establishment_id=MDI&filters.date.quick-filter=last-six-months&filters.date.granularity=monthly&filters.date.start=2025-01-31&filters.date.end=2025-07-30'
        break
      case 'download-form':
        path =
          '/embedded/platform/dpr/download-report/request-download/test-report-3/variantId-1/tableId/tblId_1753863906851/form?reportUrl=/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1753863906851/report'
        break
      case 'download-submitted':
        path =
          'http://localhost:3010/embedded/platform/dpr/download-report/request-download/test-report-3/variantId-1/tableId/tblId_1753863906851/form/submitted?reportName=C%20Test%20Report&variantName=Successful%20Report&reportUrl=/embedded/platform/dpr/view-report/async/report/test-report-3/variantId-1/tblId_1753863906851/report'
        break
      case 'missing-report-form':
        path = '/embedded/platform/dpr/request-missing-report/test-report-3/variantId-37/form'
        break
      case 'missing-report-submitted':
        path =
          '/embedded/platform/dpr/request-missing-report/test-report-3/variantId-37/submitted?reportName=C%20Test%20Report&name=Missing%20Report%20about%20beans&reportId=test-report-3&variantId=variantId-37'
        break
      case 'requested-list':
        path = '/embedded/platform/dpr/my-reports/requested-reports/list'
        break
      case 'viewed-list':
        path = '/embedded/platform/dpr/my-reports/recently-viewed/list'
        break
      case 'bookmarks-list':
        path = '/embedded/platform/dpr/my-reports/bookmarks/list'
        break
      default:
        break
    }

    cy.visit(path)
  },
)

Then(/the page is accessible/, () => {
  cy.injectAxe()
  cy.checkA11y(null, null, terminalLog)
})
