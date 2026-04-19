import { expect, describe } from '@jest/globals'
import {
  normalizeQueryStringArray,
  qsToQueryObject,
  queryObjectToQs,
  extractFiltersFromQuery,
  extractApiFiltersFromQuery,
  extractFiltersFromBody,
  formBodyToQs,
  formBodyToQueryObject,
} from './queryMappers'

// -------------------- Normalisation --------------------

describe('normalizeQueryStringArray', () => {
  it('returns undefined for undefined input', () => {
    expect(normalizeQueryStringArray(undefined)).toBeUndefined()
  })

  it('wraps a single string in an array', () => {
    expect(normalizeQueryStringArray('a')).toEqual(['a'])
  })

  it('returns arrays unchanged', () => {
    expect(normalizeQueryStringArray(['a', 'b'])).toEqual(['a', 'b'])
  })

  it('normalises numeric-keyed objects to sorted arrays', () => {
    const input = { '1': 'b', '0': 'a' }
    expect(normalizeQueryStringArray(input)).toEqual(['a', 'b'])
  })

  it('returns undefined for objects without numeric keys', () => {
    expect(normalizeQueryStringArray({ foo: 'bar' })).toBeUndefined()
  })
})

describe('qsToQueryObject', () => {
  it('groups repeated query params into arrays', () => {
    const result = qsToQueryObject('a=1&a=2&b=3')
    expect(result).toEqual({
      a: ['1', '2'],
      b: '3',
    })
  })

  it('filters keys by prefix when provided', () => {
    const result = qsToQueryObject('filters.x=1&filters.y=2&z=3', 'filters.')
    expect(result).toEqual({
      'filters.x': '1',
      'filters.y': '2',
    })
  })
})

describe('queryObjectToQs', () => {
  it('converts string and array values to a query string', () => {
    const result = queryObjectToQs({
      a: '1',
      b: ['2', '3'],
    })

    expect(result).toBe('a=1&b=2&b=3')
  })

  it('excludes default excluded keys', () => {
    const result = queryObjectToQs({
      _csrf: 'token',
      a: '1',
    })

    expect(result).toBe('a=1')
  })
})

describe('filter extraction helpers', () => {
  it('extracts only keys starting with filters.', () => {
    const result = extractFiltersFromQuery({
      'filters.x': '1',
      'filters.y': '2',
      other: '3',
    })

    expect(result).toEqual({
      'filters.x': '1',
      'filters.y': '2',
    })
  })

  it('collapses array values when extracting API filters', () => {
    const result = extractApiFiltersFromQuery({
      'filters.x': ['1', '2'],
      'filters.y': 3,
    })

    expect(result).toEqual({
      'filters.x': '1,2',
      'filters.y': '3',
    })
  })
})

describe('extractFiltersFromBody', () => {
  it('strips filters. prefix and builds nested objects', () => {
    const result = extractFiltersFromBody({
      'filters.date.from': '2024-01-01',
      'filters.date.to': '2024-01-31',
      other: 'ignore',
    })

    expect(result).toEqual({
      date: {
        from: '2024-01-01',
        to: '2024-01-31',
      },
    })
  })
})

describe('form body mapping', () => {
  it('builds a CSV-based query string from a form body', () => {
    const result = formBodyToQs({
      a: ['1', '2'],
      b: '3',
      empty: '',
    })

    expect(result).toBe('a=1,2&b=3')
  })

  it('builds an API query object from a form body', () => {
    const result = formBodyToQueryObject({
      a: ['1', '2'],
      b: '3',
      c: null,
    })

    expect(result).toEqual({
      a: '1,2',
      b: '3',
    })
  })
})
