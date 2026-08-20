import { startReportRequest, stubBaseTasks, stubDefinitionsTasks } from 'cypress-tests/cypressUtils'

context('Viewing a partial parent-child dashboard', () => {
  const path = '/'
  const dashboardName = 'Test Parent Dashboard'
  const dashboardNameRegExp = new RegExp(`${dashboardName}`)
  const notFoundMessage =
    'Data for this part of the dashboard is unavailable due to a failed execution. Please refresh the dashboard to regenerate the data. If you continue to experience issues, contact the Service Desk'
  const notFoundMessageRegExp = new RegExp(`${notFoundMessage}`)

  describe('Dashboard where a child reports fails', () => {
    let dashboardViewUrl = ''

    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFinished')
      cy.task('stubMockParentChildStatusChild1Finished')
      cy.task('stubMockParentChildStatusChild2Failed')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent')
      cy.task('stubDashboardResultParentChildChild1')
      cy.task('stubDashboardResultParentChildChild2404')
    })

    it('should not fail the overall status of a request', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')

      cy.url().then(url => {
        dashboardViewUrl = url
      })
    })

    it('should show the partial dashboard', () => {
      cy.visit(dashboardViewUrl)

      cy.findAllByLabelText(/Parent - Section 1/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Parent - Section 2/).within(() => {
        cy.findByLabelText(/MetricThree values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })

      cy.findAllByLabelText(/Child one - Section 1/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Child one - Section 2/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Child two - Section 1/).within(() => {
        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })

      cy.findAllByLabelText(/Child two - Section 2/).within(() => {
        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })
    })
  })

  describe('Dashboard where parent fails', () => {
    let dashboardViewUrl = ''

    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFailed')
      cy.task('stubMockParentChildStatusChild1Finished')
      cy.task('stubMockParentChildStatusChild2Finished')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent404')
      cy.task('stubDashboardResultParentChildChild1')
      cy.task('stubDashboardResultParentChildChild2')
    })

    it('should not fail the overall status of a request', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')

      cy.url().then(url => {
        dashboardViewUrl = url
      })
    })

    it('should show the partial dashboard', () => {
      cy.visit(dashboardViewUrl)

      cy.findAllByLabelText(/Parent - Section 1/).within(() => {
        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })

        cy.findByLabelText(/MetricThree values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('not.exist')
        })
      })

      cy.findAllByLabelText(/Parent - Section 2/).within(() => {
        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })

        cy.findByLabelText(/MetricThree values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('not.exist')
        })
      })

      cy.findAllByLabelText(/Child one - Section 1/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Child one - Section 2/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Child two - Section 1/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })

      cy.findAllByLabelText(/Child two - Section 2/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
      })
    })
  })

  describe('Dashboard where all fail', () => {
    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFailed')
      cy.task('stubMockParentChildStatusChild1Failed')
      cy.task('stubMockParentChildStatusChild2Failed')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent404')
      cy.task('stubDashboardResultParentChildChild1404')
      cy.task('stubDashboardResultParentChildChild2404')
    })

    it('should fail the overall status of a request', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByText(/Child one dashboard/i).should('be.visible')
      cy.findByText(/Child two dashboard/i).should('be.visible')
      cy.findAllByText(/failed/i).should('have.length', 3)
    })
  })

  describe('Dashboard where some fail and some return no data', () => {
    let dashboardViewUrl = ''

    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFinished')
      cy.task('stubMockParentChildStatusChild1Finished')
      cy.task('stubMockParentChildStatusChild2Failed')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent')
      cy.task('stubDashboardResultParentChildChild1NoData')
      cy.task('stubDashboardResultParentChildChild2404')
    })

    it('should not fail the overall status of a request', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')

      cy.url().then(url => {
        dashboardViewUrl = url
      })
    })

    it('should show the partial dashboard', () => {
      cy.visit(dashboardViewUrl)

      cy.findAllByLabelText(/Parent - Section 1/).within(() => {
        cy.findByText(/No data/i).should('be.visible')
      })

      cy.findAllByLabelText(/Parent - Section 2/).within(() => {
        cy.findByLabelText(/MetricThree values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })

      cy.findAllByLabelText(/Child one - Section 1/).within(() => {
        cy.findByText(/No data/i).should('be.visible')
      })

      cy.findAllByLabelText(/Child one - Section 2/).within(() => {
        cy.findByText(notFoundMessageRegExp).should('not.exist')
        cy.findByText(/No data/i).should('be.visible')
      })

      cy.findAllByLabelText(/Child two - Section 1/).within(() => {
        cy.findByLabelText(/MetricOne values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })

      cy.findAllByLabelText(/Child two - Section 2/).within(() => {
        cy.findByLabelText(/MetricTwo values/).within(() => {
          cy.findByText(notFoundMessageRegExp).should('be.visible')
        })
      })
    })
  })

  describe('Dashboard expired', () => {
    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFinished')
      cy.task('stubMockParentChildStatusChild1Finished')
      cy.task('stubMockParentChildStatusChild2Finished')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent')
      cy.task('stubDashboardResultParentChildChild1')
      cy.task('stubDashboardResultParentChildChild2')
    })

    it('should show the dahsboard as expired', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')

      let dashboardViewUrl = '/'

      cy.url().then(url => {
        dashboardViewUrl = url

        cy.visit(path)

        cy.task('stubDashboardResultParentChildParent404')
        cy.task('stubDashboardResultParentChildChild1404')
        cy.task('stubDashboardResultParentChildChild2404')

        cy.visit(dashboardViewUrl)

        // Shows the expired page
        cy.findByText(/expired/i).should('be.visible')
        cy.findByText(/Your report is no longer available and needs to be refreshed/i).should('be.visible')
      })
    })
  })

  describe('Dashboard not expired', () => {
    before(() => {
      cy.task('resetStubs')
      stubBaseTasks()
      stubDefinitionsTasks()

      // definition stubs
      cy.task('stubTestDashboardWithParentChild')
      cy.task('stubTestDashboardWithChildOne')
      cy.task('stubTestDashboardWithChildTwo')

      // request status stubs
      cy.task('stubMockParentChildStatusParentFinished')
      cy.task('stubMockParentChildStatusChild1Finished')
      cy.task('stubMockParentChildStatusChild2Finished')
      cy.task('stubViewAsyncResults')

      // result stubs
      cy.task('stubDashboardResultParentChildParent')
      cy.task('stubDashboardResultParentChildChild1')
      cy.task('stubDashboardResultParentChildChild2')
    })

    it('should show the dahsboard as not expired when all data is empty', () => {
      cy.visit(path)

      startReportRequest({
        name: dashboardName,
        description: 'Dashboard used for mocking parent-child dashboards',
      })

      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')

      let dashboardViewUrl = '/'

      cy.url().then(url => {
        dashboardViewUrl = url

        cy.visit(path)

        cy.task('stubDashboardResultParentChildParentNoData')
        cy.task('stubDashboardResultParentChildChild1NoData')
        cy.task('stubDashboardResultParentChildChild2NoData')

        cy.visit(dashboardViewUrl)

        cy.findByRole('heading', { level: 1, name: dashboardNameRegExp }).should('be.visible')
      })
    })
  })
})
