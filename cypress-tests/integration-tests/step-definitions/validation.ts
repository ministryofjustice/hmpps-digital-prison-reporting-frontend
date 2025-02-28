/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'

const fieldNames = {
  radio: 'field1',
  select: 'field2',
  autocomplete: 'field4',
  text: 'field6',
}

When(/^I type an invalid string into the (.+) box$/, (filterType: string) => {
  new ReportPage().filter(`filters.${fieldNames[filterType]}`).type('Invalid')
})

Then(/^the text box is shown$/, () => {
  new ReportPage().filter(`filters.${fieldNames.text}`).should('exist')
})

Then(/^there is (an|no) empty (radio|select) option$/, (present, filterType) => {
  const page = new ReportPage()
  let option

  switch (filterType) {
    case 'radio':
      option = page.filter(`filters.${fieldNames[filterType]}`).parent().find('label')
      break

    case 'select':
      option = page.filter(`filters.${fieldNames[filterType]}`).find('option')
      break

    default:
      option = {}
  }

  option.should((o) => {
    if (present === 'no') {
      expect(o.text()).to.not.contain('( No filter )')
    } else {
      expect(o.text()).to.contain('( No filter )')
    }
  })
})

Then(/^the (.+) box fails pattern validation$/, (filterType: string) => {
  new ReportPage().filter(`filters.${fieldNames[filterType]}`).then((t) => {
    expect(t[0].validationMessage)
      .to // Different browsers have different word order.
      .contain('Please match the')
      .contain('format')
      .contain('requested')
  })
})

Then(/^all the filters are not valid$/, function () {
  cy.get('input:invalid').should('have.length', 5)
})

Then(/^the filter form is not valid$/, function () {
  new ReportPage().filterForm().should((f) => {
    expect(f.get()[0].reportValidity()).to.eq(false)
  })
})
