/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'

const fieldNames = {
  radio: 'field1',
  select: 'field2',
  autocomplete: 'field4',
  text: 'field6'
}

When(/^I type an invalid string into the (.+) box$/, (filterType: string) => {
  new ReportPage().filter(fieldNames[filterType]).type('Invalid')
})

Then(/^the text box is shown$/, () => {
  new ReportPage().filter(fieldNames.text).should('exist')
})

Then(/^there is (an|no) empty (radio|select) option$/, (present, filterType) => {
  const page = new ReportPage()
  let option

  switch(filterType) {
    case 'radio':
      option = page.filter(fieldNames[filterType]).parent().find('label')
      break

    case 'select':
      option = page.filter(fieldNames[filterType]).find('option')
      break
  }

  option.should(o => {
    if (present === 'no') {
      expect(o.text()).to.not.contain('( No filter )')
    } else {
      expect(o.text()).to.contain('( No filter )')
    }
  })
})

Then(/^the (.+) box fails pattern validation$/, (filterType: string) => {
  new ReportPage().filter(fieldNames[filterType]).then(t => {
    // @ts-ignore
    expect(t[0].validationMessage).to.eq('Please match the format requested.')
  })
})

Then(/^all the filters are not valid$/, function() {
  cy.get('input:invalid').should('have.length', 6)
})