/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterType } from '../components/_filters/filter-input/enum'
import { components } from '../types/api'
import { DprConfig } from '../types/DprConfig'

export const clearFilterValue = '~clear~'

export const createUrlForParameters = (
  currentQueryParams: NodeJS.Dict<string | Array<string>>,
  updateQueryParams: NodeJS.Dict<string>,
  fields?: components['schemas']['FieldDefinition'][],
) => {
  let queryParams: NodeJS.Dict<string | Array<string>>

  if (updateQueryParams) {
    queryParams = {
      ...currentQueryParams,
      selectedPage: '1',
    }

    Object.keys(updateQueryParams).forEach((q) => {
      if (updateQueryParams[q]) {
        queryParams[q] = updateQueryParams[q]
      } else {
        Object.keys(queryParams)
          .filter((key) => key === q || key.startsWith(`${q}.`))
          .forEach((key) => {
            queryParams[key] = clearFilterValue
          })
      }
    })
  } else {
    queryParams = {
      selectedPage: '1',
      pageSize: currentQueryParams['pageSize'],
      sortColumn: currentQueryParams['sortColumn'],
      sortedAsc: currentQueryParams['sortedAsc'],
      dataProductDefinitionsPath: currentQueryParams['dataProductDefinitionsPath'],
    }
  }

  const nonEmptyQueryParams: NodeJS.Dict<string | Array<string>> = {}

  Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .forEach((key) => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  return createQuerystringFromObject(nonEmptyQueryParams, fields)
}

export const createQuerystringFromObject = (
  source: NodeJS.Dict<string | Array<string>>,
  fields?: components['schemas']['FieldDefinition'][],
) => {
  const querystring = Object.keys(source)
    .flatMap((key: string) => {
      const fieldDef = fields?.find((f) => `filters.${f.name}` === key)
      const value = source[key] || ''

      if (Array.isArray(value)) {
        return value.map((v) => `${encodeURI(key)}=${encodeURI(v)}`)
      }

      if (fieldDef && fieldDef.filter && fieldDef.filter.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
        const values = value.split(',')
        return values.map((v) => {
          return `${encodeURI(key)}=${encodeURI(v)}`
        })
      }

      return [`${encodeURI(key)}=${encodeURI(value)}`]
    })
    .join('&')

  return `?${querystring}`
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

/**
 * Normalizes a querystring parameter into a consistent string array.
 *
 * Needed because Express/qs may return repeated query params as strings, arrays,
 * or numeric‑keyed objects depending on parser settings and arrayLimit behavior
 *
 * @param value The raw query parameter value from req.query.
 * @returns An array of strings representing the normalized parameter.
 */

export const normalizeQueryStringArray = (
  queryParamValue: string[] | string | Record<string, string> | undefined,
): string[] | undefined => {
  if (queryParamValue == null) return undefined

  if (Array.isArray(queryParamValue)) return queryParamValue

  if (typeof queryParamValue === 'object') {
    const obj = queryParamValue as Record<string, string>
    const numericKeys = Object.keys(obj)
      .filter((k) => /^\d+$/.test(k))
      .sort((a, b) => Number(a) - Number(b))

    return numericKeys.length > 0 ? numericKeys.map((k) => obj[k]) : undefined
  }

  return typeof queryParamValue === 'string' ? [queryParamValue] : undefined
}

/**
 * Converts a querystring to a query object
 *
 * @param {string} qs
 * @param {string} prefix
 * @return {*}  {(Record<string, string | string[]>)}
 */
export const qsToQueryObject = (qs: string, prefix: string): Record<string, string | string[]> => {
  return Array.from(new URLSearchParams(qs).entries())
    .filter(([key]) => key.startsWith(prefix))
    .reduce<Record<string, string | string[]>>((acc, [key, value]) => {
      const existing = acc[key]

      if (existing === undefined) {
        acc[key] = value
      } else if (Array.isArray(existing)) {
        acc[key] = [...existing, value]
      } else {
        acc[key] = [existing, value]
      }

      return acc
    }, {})
}

/**
 * Converts a query obect back to a querystring
 *
 * @param {(Record<string, string | string[]>)} query
 * @return {*}  {string}
 */
const DEFAULT_EXCLUDED_KEYS = new Set(['_csrf'])
export const queryObjectToQs = (
  source: Record<string, string | string[]>,
  exclude: Set<string> = DEFAULT_EXCLUDED_KEYS,
): string => {
  return Object.entries(source)
    .filter(([key]) => !exclude.has(key))
    .flatMap(([key, value]) => (Array.isArray(value) ? value.map((v) => [key, v] as const) : [[key, value] as const]))
    .reduce((params, [key, value]) => {
      params.append(key, value)
      return params
    }, new URLSearchParams())
    .toString()
}

export default createUrlForParameters
