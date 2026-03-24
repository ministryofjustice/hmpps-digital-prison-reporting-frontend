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
): string[] => {
  if (Array.isArray(queryParamValue)) {
    return queryParamValue
  }

  if (queryParamValue && typeof queryParamValue === 'object') {
    const obj = queryParamValue as Record<string, string>

    const numericKeys = Object.keys(obj)
      .filter((k) => /^\d+$/.test(k))
      .sort((a, b) => Number(a) - Number(b))

    if (numericKeys.length > 0) {
      return numericKeys.map((k) => obj[k])
    }

    // If it's an object but not numeric-keyed, it's invalid.
    return []
  }

  if (typeof queryParamValue === 'string') {
    return [queryParamValue]
  }

  return []
}

export default createUrlForParameters
