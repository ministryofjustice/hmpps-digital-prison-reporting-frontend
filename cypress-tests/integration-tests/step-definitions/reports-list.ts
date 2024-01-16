/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ReportPage from '../pages/ReportPage'
import reportDefinition from '../../../test-app/reportDefinition'
import data from '../../../test-app/data'
import { components } from '../../../src/dpr/types/api'

When(/^I click the Show Filter button$/, function () {
  const page = new ReportPage()
  page.showFilterButton().click()
})

When('I select a filter', function (this: Mocha.Context) {
  const page = new ReportPage()

  const filterField = reportDefinition.variant.specification.fields.find(
    (field) => field.filter && field.filter.type !== 'daterange',
  )

  let filterValue = filterField.filter.staticOptions[0]

  switch (filterField.filter.type) {
    case 'Select':
      page.filter(filterField.name).select(filterValue.name)
      break
    case 'Radio':
      page.filter(filterField.name).click()
      page.filter(filterField.name).then((selectedRadio) => {
        filterValue = filterField.filter.staticOptions.find((value) => value.name === selectedRadio.val())
      })
      break
    default:
  }

  this.selectedFilter = {
    field: filterField,
    value: filterValue,
  }
})

When('I apply the filters', function () {
  const page = new ReportPage()

  page.applyFiltersButton().click()
})

When('I click the selected filter', function () {
  const page = new ReportPage()

  page.selectedFilterButton().click()
})

When('I click a the Clear all button', function () {
  const page = new ReportPage()

  page.clearAllButton().click()
})

When('I select a column to sort on', function (this: Mocha.Context) {
  const page = new ReportPage()

  page
    .unsortedSortColumnLink()
    .then((column) => {
      this.currentSortColumn = column.data('column')
    })
    .click()
})

When('I select a previously selected column to sort on', function (this: Mocha.Context) {
  const page = new ReportPage()

  page
    .currentSortColumnLink()
    .then((column) => {
      this.currentSortColumn = column.data('column')
    })
    .click()
})

When(/^I select a page size of (\d+)$/, function (this: Mocha.Context, pageSize: number) {
  const page = new ReportPage()

  this.currentPageSize = pageSize
  page.pageSizeSelector().select(`${pageSize}`)
})

When('I click a paging link', function (this: Mocha.Context) {
  const page = new ReportPage()

  page
    .pagingLink()
    .then((link) => {
      this.currentPage = link.text().trim()
    })
    .click()
})

Then('the Show Filter button is displayed', function (this: Mocha.Context) {
  const page = new ReportPage()

  page.showFilterButton().should('exist')
})

Then(/^the Filter panel is (open|closed)$/, function (panelStatus) {
  const panel = new ReportPage().filterPanel()

  if (panelStatus === 'open') {
    panel.should('not.have.class', 'moj-js-hidden')
  } else {
    panel.should('have.class', 'moj-js-hidden')
  }
})
Then('filters are displayed for filterable fields', function (this: Mocha.Context) {
  const page = new ReportPage()

  reportDefinition.variant.specification.fields
    .filter((field) => field.filter)
    .forEach((field) => {
      switch (field.filter.type) {
        case 'daterange':
          page.filter(`${field.name}\\.start`).parent().contains('Start')
          page.filter(`${field.name}\\.end`).parent().contains('End')
          break

        case 'Radio':
          page.filter(field.name).parentsUntil('.govuk-form-group').contains(field.display)
          field.filter.staticOptions.forEach((option) => {
            page.filter(field.name).parentsUntil('.govuk-form-group').contains(option.display)
            page
              .filter(field.name)
              .parentsUntil('.govuk-fieldset')
              .find(`input[value='${option.name}']`)
              .should('exist')
          })
          break

        case 'Select':
        default:
          page.filter(field.name).parentsUntil('.govuk-fieldset').contains(field.display)
      }
    })
})

Then('the column headers are displayed correctly', function (this: Mocha.Context) {
  const page = new ReportPage()

  reportDefinition.variant.specification.fields.forEach((field) => {
    page.dataTable().find('thead').contains(field.display)
  })
})

Then('date times are displayed in the correct format', function (this: Mocha.Context) {
  const page = new ReportPage()

  reportDefinition.variant.specification.fields.forEach((field, index) => {
    if (field.type === 'date') {
      page
        .dataTable()
        .get(`tbody tr:first-child td:nth-child(${index + 1})`)
        .contains(/\d\d\/\d\d\/\d\d \d\d:\d\d/)
    }
  })
})
Then('the correct data is displayed on the page', function (this: Mocha.Context) {
  const page = new ReportPage()

  page.dataTable().find('tbody tr').should('have.length', data.length)
  const record = data[0]
  Object.keys(record).forEach((key) => {
    if (reportDefinition.variant.specification.fields.find((f) => f.name === key).type !== 'date') {
      page.dataTable().find('tbody tr').first().contains(record[key])
    }
  })
})

Then('the selected filter value is displayed', function (this: Mocha.Context) {
  const page = new ReportPage()

  const selectedField: components['schemas']['FieldDefinition'] = this.selectedFilter.field
  const selectedValue: components['schemas']['FilterOption'] = this.selectedFilter.value

  page.selectedFilterButton().contains(`${selectedField.display}: ${selectedValue.display}`)
})

Then('no filters are selected', function (this: Mocha.Context) {
  const page = new ReportPage()

  page.selectedFilterButton().should('not.exist')
})

Then('the selected filter value is shown in the URL', function (this: Mocha.Context) {
  const selectedField: components['schemas']['FieldDefinition'] = this.selectedFilter.field
  const selectedValue: components['schemas']['FilterOption'] = this.selectedFilter.value

  cy.location().should((location) => {
    expect(location.search).to.contain(`${selectedField.name}=${selectedValue.name}`)
  })
})

Then(
  /^the sorted column is shown as sorted (ascending|descending) in the header$/,
  function (this: Mocha.Context, direction: string) {
    const page = new ReportPage()
    const { currentSortColumn } = this

    page.currentSortColumnLink().should((link) => {
      expect(link).to.have.data('column', currentSortColumn)
      expect(link).to.have.attr('aria-sort', direction)
      expect(link).to.have.class(`data-table-header-button-sort-${direction}`)
    })
  },
)

Then('the sorted column is shown in the URL', function (this: Mocha.Context) {
  const { currentSortColumn } = this
  cy.location().should((location) => {
    expect(location.search).to.contain(`sortColumn=${currentSortColumn}`)
  })
})

Then(/^the (ascending|descending) sort direction is shown in the URL$/, function (direction: string) {
  const ascending = direction === 'ascending'

  cy.location().should((location) => {
    expect(location.search).to.contain(`sortedAsc=${ascending}`)
  })
})

Then('the page size is shown in the URL', function (this: Mocha.Context) {
  cy.location().should((location) => {
    expect(location.search).to.contain(`pageSize=${this.currentPageSize}`)
  })
})

Then('the current page is shown in the URL', function (this: Mocha.Context) {
  cy.location().should((location) => {
    expect(location.search).to.contain(`selectedPage=${this.currentPage}`)
  })
})
