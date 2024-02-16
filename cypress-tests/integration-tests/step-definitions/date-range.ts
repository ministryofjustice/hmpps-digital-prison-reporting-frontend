import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'

const validStartDate = '2004-12-20'
const validEndDate = '2006-12-20'
const invalidStartDate = '2000-12-20'
const invalidEndDate = '2009-12-20'
const minMaxURL = 'filters.field3.start=2003-02-01&filters.field3.end=2007-05-04'
const validURL = 'filters.field3.start=2004-12-20&filters.field3.end=2006-12-20'

Then('the daterange filter is shown', () => {
  const reportPage = new ReportPage()
  reportPage.dateStartFilter().should('exist')
  reportPage.dateEndFilter().should('exist')
})

// eslint-disable-next-line func-names
When(/^I enter a (start|end) date$/, function (this: Mocha.Context, type: string) {
  const reportPage = new ReportPage()
  const filter = type === 'start' ? reportPage.dateStartFilter() : reportPage.dateEndFilter()
  const date = type === 'start' ? validStartDate : validEndDate
  filter.type(date)
})

When(
  /^I enter a (start|end) date (before|after) the (min|max) date$/,
  // eslint-disable-next-line func-names
  function (this: Mocha.Context, type: string, beforeAfter: string, minMax: string) {
    const reportPage = new ReportPage()
    const filter = type === 'start' ? reportPage.dateStartFilter() : reportPage.dateEndFilter()
    const date = minMax === 'min' ? invalidStartDate : invalidEndDate
    filter.type(date)
  },
)

Then('the daterange is displays the values in the URL', () => {
  cy.location().should((location) => {
    expect(location.search).to.contain(validURL)
  })
})

Then('the daterange is displays the min and max values in the URL', () => {
  cy.location().should((location) => {
    expect(location.search).to.contain(minMaxURL)
  })
})
