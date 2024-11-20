import { parse } from 'node-html-parser'
import nunjucks from 'nunjucks'
import path from 'path'
import { FilterType } from '../_filters/filter-input/enum'
import setUpNunjucksFilters from '../../setUpNunjucksFilters'

const env = nunjucks.configure(
  [
    path.join(__dirname, '../../../../node_modules/govuk-frontend/dist'),
    path.join(__dirname, '../../../../node_modules/@ministryofjustice/frontend'),
    path.join(__dirname, '../../..'),
    path.join(__dirname, '.'),
  ],
  { autoescape: true },
)

setUpNunjucksFilters(env)

const defaultOptions = {
  filters: [
    {
      text: 'Direction',
      name: 'direction',
      type: FilterType.radio,
      options: [
        { value: 'in', text: 'In' },
        { value: 'out', text: 'Out' },
      ],
      value: 'in',
    },
    {
      text: 'Type',
      name: 'type',
      type: FilterType.select,
      options: [
        { value: 'a', text: 'A' },
        { value: 'b', text: 'B' },
      ],
      value: 'b',
    },
    {
      text: 'Date',
      name: 'date',
      type: FilterType.dateRange.toLowerCase(),
      value: {
        start: '2001-02-03',
        end: '2004-05-06',
      },
      max: '2007-08-09',
    },
    {
      text: 'Autocomplete',
      name: 'autocomplete',
      type: FilterType.autocomplete.toLowerCase(),
      value: 'Value',
      options: [
        { value: 'Value1', text: 'Value1' },
        { value: 'Value2', text: 'Value2' },
      ],
    },
  ],
  urlWithNoFilters: 'urlWithNoFiltersValue',
}

const testView = '{% from "view.njk" import dprFilters %}{{ dprFilters(filters, urlWithNoFilters) }}'

describe('Filters options render correctly', () => {
  it('Select filter renders successfully', () => {
    const rendered = parse(env.renderString(testView, defaultOptions))

    const typeFilterSelect = rendered.querySelectorAll('#filters\\.type')
    expect(typeFilterSelect.length).toEqual(1)
    expect(typeFilterSelect[0].tagName).toBe('SELECT')
    const selectedOption = typeFilterSelect[0].querySelector('option[selected]')
    expect(selectedOption.text).toEqual('B')
    expect(selectedOption.getAttribute('value')).toEqual('b')
  })

  it('Radio filter renders successfully', () => {
    const rendered = parse(env.renderString(testView, defaultOptions))

    const clearDirectionRadio = rendered.querySelectorAll('#filters\\.direction')
    expect(clearDirectionRadio.length).toEqual(1)
    expect(clearDirectionRadio[0].tagName).toBe('INPUT')
    expect(clearDirectionRadio[0].getAttribute('type')).toEqual('radio')
    expect(clearDirectionRadio[0].getAttribute('value')).toEqual('')
    expect(clearDirectionRadio[0].getAttribute('checked')).toBeUndefined()

    const firstDirectionRadio = rendered.querySelectorAll('#filters\\.direction-2')
    expect(firstDirectionRadio.length).toEqual(1)
    expect(firstDirectionRadio[0].tagName).toBe('INPUT')
    expect(firstDirectionRadio[0].getAttribute('type')).toEqual('radio')
    expect(firstDirectionRadio[0].getAttribute('value')).toEqual('in')
    expect(firstDirectionRadio[0].getAttribute('checked')).toBeDefined()

    const secondDirectionRadio = rendered.querySelectorAll('#filters\\.direction-3')
    expect(secondDirectionRadio.length).toEqual(1)
    expect(secondDirectionRadio[0].tagName).toBe('INPUT')
    expect(secondDirectionRadio[0].getAttribute('type')).toEqual('radio')
    expect(secondDirectionRadio[0].getAttribute('value')).toEqual('out')
    expect(secondDirectionRadio[0].getAttribute('checked')).toBeUndefined()
  })

  it('Date range filters render successfully', () => {
    const rendered = parse(env.renderString(testView, defaultOptions))

    const startDate = rendered.querySelectorAll('#filters\\.date\\.start')

    expect(startDate.length).toEqual(1)
    expect(startDate[0].tagName).toBe('INPUT')
    expect(startDate[0].getAttribute('value')).toEqual('03/02/2001')

    const endDate = rendered.querySelectorAll('#filters\\.date\\.end')
    expect(endDate.length).toEqual(1)
    expect(endDate[0].tagName).toBe('INPUT')
    expect(endDate[0].getAttribute('value')).toEqual('06/05/2004')
  })

  it('Autocomplete filter renders successfully', () => {
    const rendered = parse(env.renderString(testView, defaultOptions))

    const autocomplete = rendered.querySelectorAll('#filters\\.autocomplete')
    expect(autocomplete.length).toEqual(1)
    expect(autocomplete[0].tagName).toBe('INPUT')
    expect(autocomplete[0].getAttribute('type')).toEqual('search')
    expect(autocomplete[0].getAttribute('value')).toEqual('Value')

    const autocompleteList = rendered.querySelectorAll('#filtersautocomplete-list')
    expect(autocompleteList.length).toEqual(1)
    const options = autocompleteList[0].getElementsByTagName('button')
    expect(options.length).toEqual(2)
    expect(options[0].text.trim()).toEqual('Value1')
    expect(options[1].text.trim()).toEqual('Value2')
  })
})
