import nunjucks from 'nunjucks'
import path from 'path'
import filters from './utils'
import type { DataTableOptions } from './types'
import setUpNunjucksFilters from '../../setUpNunjucksFilters'

const testView =
  '{% from "view.njk" import dprDataTable %}' +
  '{{ dprDataTable(\n' +
  '  head,\n' +
  '  rows,\n' +
  '  count,\n' +
  '  currentQueryParams\n' +
  ') }}'

const env = nunjucks.configure(
  [
    path.join(__dirname, '../../../../node_modules/govuk-frontend/dist'),
    path.join(__dirname, '../../..'),
    path.join(__dirname, '/'),
    path.join(__dirname, '.'),
  ],
  { autoescape: true },
)

Object.keys(filters).forEach((filterName) => {
  env.addFilter(filterName, filters[filterName])
})

setUpNunjucksFilters(env)

const defaultQueryParams = {
  selectedPage: '1',
  pageSize: '2',
  sortColumn: 'header1',
  sortedAsc: 'true',
}
const defaultOptions: DataTableOptions = {
  classification: '',
  url: '',
  head: [{ html: 'Header 1' }, { html: 'Header 2' }],
  rows: [
    [{ text: 'Value 1.1' }, { text: 'Value 1.2' }],
    [{ text: 'Value 2.1' }, { text: 'Value 2.2' }],
  ],
  count: 20,
  currentQueryParams: defaultQueryParams,
}

describe('Content renders correctly', () => {
  it('Headers render successfully', () => {
    const rendered = nunjucks.renderString(testView, defaultOptions)
    defaultOptions.head.forEach((header) => expect(rendered).toContain(header.html))
  })

  it('Data renders successfully', () => {
    const rendered = nunjucks.renderString(testView, defaultOptions)

    defaultOptions.rows.forEach((row) => row.forEach((cell) => expect(rendered).toContain(cell.text)))
  })
})

describe('Page picker renders correctly', () => {
  it('Displays correctly for page 1 of 10', () => {
    const rendered = nunjucks.renderString(testView, defaultOptions)

    expectNoPreviousButton(rendered)
    expectSelectedPage(rendered, 1)
    expectPage(rendered, 2)
    expectNoPage(rendered, 3)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  it('Displays correctly for page 3 of 10', () => {
    const options: DataTableOptions = getOptionsForSelectedPage(3)

    const rendered = nunjucks.renderString(testView, options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectPage(rendered, 2)
    expectSelectedPage(rendered, 3)
    expectPage(rendered, 4)
    expectNoPage(rendered, 5)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  it('Displays correctly for page 5 of 10', () => {
    const options: DataTableOptions = getOptionsForSelectedPage(5)

    const rendered = nunjucks.renderString(testView, options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectNoPage(rendered, 2)
    expectNoPage(rendered, 3)
    expectPage(rendered, 4)
    expectSelectedPage(rendered, 5)
    expectPage(rendered, 6)
    expectNoPage(rendered, 7)
    expectNoPage(rendered, 8)
    expectNoPage(rendered, 9)
    expectPage(rendered, 10)
    expectNextButton(rendered)

    expectEllipses(rendered, 2)
  })

  it('Displays correctly for page 10 of 10', () => {
    const options: DataTableOptions = getOptionsForSelectedPage(10)

    const rendered = nunjucks.renderString(testView, options)

    expectPreviousButton(rendered)
    expectPage(rendered, 1)
    expectNoPage(rendered, 2)
    expectNoPage(rendered, 8)
    expectPage(rendered, 9)
    expectSelectedPage(rendered, 10)
    expectNoNextButton(rendered)

    expectEllipses(rendered, 1)
  })

  const getOptionsForSelectedPage = (selectedPage: number) => ({
    ...defaultOptions,
    currentQueryParams: {
      ...defaultQueryParams,
      selectedPage: selectedPage.toString(),
    },
  })

  const expectPage = (content: string, pageNumber: number) => {
    expect(content).toMatch(new RegExp(`aria-label="Page ${pageNumber}">\\s+${pageNumber}\\s+<\\/a>`))
  }

  const expectSelectedPage = (content: string, pageNumber: number) => {
    expect(content).toMatch(
      new RegExp(`aria-label="Page ${pageNumber}" aria-current="page">\\s+${pageNumber}\\s+<\\/a>`),
    )
  }

  const expectNoPage = (content: string, pageNumber: number) => {
    expect(content).not.toMatch(new RegExp(`"Page ${pageNumber}"`))
  }

  const ellipsisPattern = /<li class="govuk-pagination__item govuk-pagination__item--ellipses">\s*&ctdot;\s*<\/li>/g

  const expectEllipses = (content: string, numberOfEllipses: number) => {
    expect(content).toMatch(ellipsisPattern)
    expect(content.match(ellipsisPattern).length).toEqual(numberOfEllipses)
  }

  const expectPreviousButton = (content: string) => {
    expect(content).toMatch(
      /<span class="govuk-pagination__link-title">\s*Previous<span class="govuk-visually-hidden"> page<\/span>\s*<\/span>/,
    )
  }

  const expectNoPreviousButton = (content: string) => {
    expect(content).not.toMatch(
      /<span class="govuk-pagination__link-title">\s*Previous<span class="govuk-visually-hidden"> page<\/span>\s*<\/span>/,
    )
  }

  const expectNextButton = (content: string) => {
    expect(content).toMatch(
      /<span class="govuk-pagination__link-title">\s*Next<span class="govuk-visually-hidden"> page<\/span>\s*<\/span>/,
    )
  }

  const expectNoNextButton = (content: string) => {
    expect(content).not.toMatch(
      /<span class="govuk-pagination__link-title">\s*Next<span class="govuk-visually-hidden"> page<\/span>\s*<\/span>/,
    )
  }
})

describe('Page size picker renders correctly', () => {
  it('Displays correctly', () => {
    const options: DataTableOptions = {
      ...defaultOptions,
      currentQueryParams: {
        ...defaultQueryParams,
        pageSize: '100',
      },
    }

    const rendered = nunjucks.renderString(testView, options)

    expectPageSizeOption(rendered, 10)
    expectPageSizeOption(rendered, 20)
    expectSelectedPageSizeOption(rendered, 100)
    expectPageSizeOption(rendered, 200)
  })

  const expectPageSizeOption = (content: string, pageSize: number) => {
    expect(content).toContain(`<option value="${pageSize}">${pageSize}</option>`)
  }

  const expectSelectedPageSizeOption = (content: string, pageSize: number) => {
    expect(content).toContain(`<option value="${pageSize}" selected>${pageSize}</option>`)
  }
})
