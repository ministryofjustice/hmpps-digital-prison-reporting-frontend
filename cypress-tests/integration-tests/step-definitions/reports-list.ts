/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import MainPage from '../pages/MainPage'
import reportDefinition from '../../../test-app/reportDefinition'
import data from '../../../test-app/data'
import { FieldDefinition, FilterOption } from '../../../package/dpr/types'

When(/^I click the Show Filter button$/, function () {
  const page = new MainPage()
  page.showFilterButton().click()
})

When('I select a filter', function (this: Mocha.Context) {
  const page = new MainPage()

  const filterField = reportDefinition.variant.fields.find(
    field => field.filter && field.filter.type !== 'DateRange',
  )

  let filterValue = filterField.filter.staticOptions[0]

  switch (filterField.filter.type) {
    case 'Select':
      page.filter(filterField.name).select(filterValue.name)
      break
    case 'Radio':
      page.filter(filterField.name).click()
      page.filter(filterField.name).then(selectedRadio => {
        filterValue = filterField.filter.staticOptions.find(value => value.name === selectedRadio.val())
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
  const page = new MainPage()

  page.applyFiltersButton().click()
})

When('I click the selected filter', function () {
  const page = new MainPage()

  page.selectedFilterButton().click()
})

When('I click a the Clear all button', function () {
  const page = new MainPage()

  page.clearAllButton().click()
})

When('I select a column to sort on', function (this: Mocha.Context) {
  const page = new MainPage()

  page
    .unsortedSortColumnLink()
    .then(column => {
      this.currentSortColumn = column.data('column')
    })
    .click()
})

When('I select a previously selected column to sort on', function (this: Mocha.Context) {
  const page = new MainPage()

  page
    .currentSortColumnLink()
    .then(column => {
      this.currentSortColumn = column.data('column')
    })
    .click()
})

When(/^I select a page size of (\d+)$/, function (this: Mocha.Context, pageSize: number) {
  const page = new MainPage()

  this.currentPageSize = pageSize
  page.pageSizeSelector().select(`${pageSize}`)
})

When('I click a paging link', function (this: Mocha.Context) {
  const page = new MainPage()

  page
    .pagingLink()
    .then(link => {
      this.currentPage = link.text().trim()
    })
    .click()
})

Then('the Show Filter button is displayed', function (this: Mocha.Context) {
  const page = new MainPage()

  page.showFilterButton().should('exist')
})

Then(/^the Filter panel is (open|closed)$/, function (panelStatus) {
  const panel = new MainPage().filterPanel()

  if (panelStatus === 'open') {
    panel.should('not.have.class', 'moj-js-hidden')
  } else {
    panel.should('have.class', 'moj-js-hidden')
  }
})
Then('filters are displayed for filterable fields', function (this: Mocha.Context) {
  const page = new MainPage()

  reportDefinition.variant.fields
    .filter(field => field.filter)
    .forEach(field => {
      switch (field.filter.type) {
        case 'DateRange':
          page.filter(`${field.name}\\.start`).parent().contains('Start')
          page.filter(`${field.name}\\.end`).parent().contains('End')
          break

        case 'Radio':
          page.filter(field.name).parentsUntil('.govuk-form-group').contains(field.displayName)
          field.filter.staticOptions.forEach(option => {
            page.filter(field.name).parentsUntil('.govuk-form-group').contains(option.displayName)
            page
              .filter(field.name)
              .parentsUntil('.govuk-fieldset')
              .find(`input[value='${option.name}']`)
              .should('exist')
          })
          break

        case 'Select':
        default:
          page.filter(field.name).parentsUntil('.govuk-fieldset').contains(field.displayName)
      }
    })
})

Then('the column headers are displayed correctly', function (this: Mocha.Context) {
  const page = new MainPage()

  reportDefinition.variant.fields.forEach(field => {
    page.dataTable().find('thead').contains(field.displayName)
  })
})

Then('date times are displayed in the correct format', function (this: Mocha.Context) {
  const page = new MainPage()

  reportDefinition.variant.fields.forEach((field, index) => {
    if (field.type === 'Date') {
      page
        .dataTable()
        .get(`tbody tr:first-child td:nth-child(${index + 1})`)
        .contains(/\d\d\/\d\d\/\d\d \d\d:\d\d/)
    }
  })
})
Then('the correct data is displayed on the page', function (this: Mocha.Context) {
  const page = new MainPage()


  page.dataTable().find('tbody tr').should('have.length', data.length)
  const record = data[0]
  Object.keys(record).forEach(key => {
    if (reportDefinition.variant.fields.find(f => f.name === key).type !== 'Date') {
      page.dataTable().find('tbody tr').first().contains(record[key])
    }
  })
})

Then('the selected filter value is displayed', function (this: Mocha.Context) {
  const page = new MainPage()

  const selectedField: FieldDefinition = this.selectedFilter.field
  const selectedValue: FilterOption = this.selectedFilter.value

  page.selectedFilterButton().contains(`${selectedField.displayName}: ${selectedValue.displayName}`)
})

Then('no filters are selected', function (this: Mocha.Context) {
  const page = new MainPage()

  page.selectedFilterButton().should('not.exist')
})

Then('the selected filter value is shown in the URL', function (this: Mocha.Context) {
  const selectedField: FieldDefinition = this.selectedFilter.field
  const selectedValue: FilterOption = this.selectedFilter.value

  cy.location().should(location => {
    expect(location.search).to.contain(`${selectedField.name}=${selectedValue.name}`)
  })
})

Then(
  /^the sorted column is shown as sorted (ascending|descending) in the header$/,
  function (this: Mocha.Context, direction: string) {
    const page = new MainPage()
    const { currentSortColumn } = this

    page.currentSortColumnLink().should(link => {
      expect(link).to.have.data('column', currentSortColumn)
      expect(link).to.have.attr('aria-sort', direction)
      expect(link).to.have.class(`data-table-header-button-sort-${direction}`)
    })
  },
)

Then('the sorted column is shown in the URL', function (this: Mocha.Context) {
  const { currentSortColumn } = this
  cy.location().should(location => {
    expect(location.search).to.contain(`sortColumn=${currentSortColumn}`)
  })
})

Then(/^the (ascending|descending) sort direction is shown in the URL$/, function (direction: string) {
  const ascending = direction === 'ascending'

  cy.location().should(location => {
    expect(location.search).to.contain(`sortedAsc=${ascending}`)
  })
})

Then('the page size is shown in the URL', function (this: Mocha.Context) {
  cy.location().should(location => {
    expect(location.search).to.contain(`pageSize=${this.currentPageSize}`)
  })
})

Then('the current page is shown in the URL', function (this: Mocha.Context) {
  cy.location().should(location => {
    expect(location.search).to.contain(`selectedPage=${this.currentPage}`)
  })
})
