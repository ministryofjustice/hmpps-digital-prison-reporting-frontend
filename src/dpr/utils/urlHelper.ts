/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterType } from '../components/_filters/filter-input/enum'
import { components } from '../types/api'
import { DprConfig } from '../types/DprConfig'

export const clearFilterValue = '~clear~'

/**
 * Merges two query objects to produce a query string
 *
 * @param {Record<string, unknown>} currentQuery
 * @param {(Record<string, string | undefined>)} updates
 * @return {*}  {string}
 */
export const mergeAndStringifyQuery = (
  currentQuery: Record<string, unknown>,
  updates: Record<string, string | string[] | undefined>,
  fields: components['schemas']['FieldDefinition'][],
): string => {
  const params = new URLSearchParams()

  Object.entries({ ...currentQuery, ...updates }).forEach(([key, value]) => {
    if (value == null || value === '') return

    // Special handling for filters.*
    if (key.startsWith('filters.') && typeof value === 'string') {
      const fieldName = key.replace('filters.', '')
      const fieldDef = fields.find((f) => f.name === fieldName)

      // Only expand CSV for multiselect filters
      if (fieldDef?.filter?.type?.toLowerCase() === FilterType.multiselect.toLowerCase() && value.includes(',')) {
        value
          .split(',')
          .filter(Boolean)
          .forEach((v) => params.append(key, v))
        return
      }
    }

    // Arrays = repeated params
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)))
      return
    }

    // single param
    params.set(key, String(value))
  })

  return `?${params.toString()}`
}

/**
 * Joins two query strings together
 *
 * @param {(...Array<string | undefined>)} parts
 * @return {*}
 */
export const joinQueryStrings = (...parts: Array<string | undefined>) => {
  return parts
    .filter((p): p is string => Boolean(p && p.length))
    .map((p) => p.replace(/^\?/, ''))
    .join('&')
}

/**
 * Merges two sets of query strings
 *
 * @param {string} baseQs
 * @param {string} overrideQs
 * @return {*}  {string}
 */
export const mergeQueryStrings = (baseQs: string, overrideQs: string): string => {
  const baseParams = new URLSearchParams(baseQs)
  const overrideParams = new URLSearchParams(overrideQs)

  Array.from(overrideParams.entries()).forEach(([key, value]) => {
    baseParams.delete(key)
    baseParams.append(key, value)
  })

  const result = baseParams.toString()
  return result ? `${result}` : ''
}

export const getDpdPathSuffix = (dpdsPath: string) => {
  if (dpdsPath && dpdsPath !== '') {
    return `?dataProductDefinitionsPath=${dpdsPath}`
  }

  return ''
}

export const getRoutePrefix = (config?: DprConfig) => {
  let prefix = config?.routePrefix
  if (!prefix) {
    prefix = '/dpr'
  }
  if (prefix === 'dpr') {
    prefix = ''
  }
  return prefix
}

export const setNestedPath = (url: string, baseUrl?: string) => {
  return baseUrl && baseUrl !== 'undefined' ? `${baseUrl}${url}` : url
}
