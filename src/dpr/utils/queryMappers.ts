import { uiDateToApi } from './dateHelper'

// ------------------------------------------
// Normalization
// ------------------------------------------

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

// ------------------------------------------
// Parsing
// ------------------------------------------

const DEFAULT_EXCLUDED_KEYS = new Set([
  '_csrf',
  'reportName',
  'name',
  'reportId',
  'id',
  'description',
  'type',
  'sections',
])

/**
 * Converts a querystring to a query object
 *
 * @param {string} qs
 * @param {string} prefix
 * @return {*}  {(Record<string, string | string[]>)}
 */
export const qsToQueryObject = (qs: string, prefix?: string): Record<string, string | string[]> => {
  return Array.from(new URLSearchParams(qs).entries())
    .filter(([key]) => (prefix ? key.startsWith(prefix) : true))
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
export const queryObjectToQs = (
  source: Record<string, string | string[]>,
  exclude: Set<string> = DEFAULT_EXCLUDED_KEYS,
): string => {
  return Object.entries(source)
    .filter(([key]) => !exclude.has(key))
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map((v) => [key, normaliseUiDateIfPresent(v)] as const)
        : [[key, normaliseUiDateIfPresent(value)] as const],
    )
    .reduce((params, [key, value]) => {
      params.append(key, value)
      return params
    }, new URLSearchParams())
    .toString()
}

const UI_DATE_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
const normaliseUiDateIfPresent = (value: string): string => {
  if (!UI_DATE_REGEX.test(value)) {
    return value
  }

  return uiDateToApi(value) ?? value
}

/**
 * Extracts `filters.*` entries from a query object.
 */
export const extractFiltersFromQuery = (query: Record<string, unknown>): Record<string, unknown> => {
  return Object.fromEntries(Object.entries(query).filter(([key]) => key.startsWith('filters.')))
}

/**
 * Extracts `filters.*` entries and normalises values for the API.
 */
export const extractApiFiltersFromQuery = (query: Record<string, unknown>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(query)
      .filter(([key]) => key.startsWith('filters.'))
      .map(([key, value]) => [key, Array.isArray(value) ? value.map(String).join(',') : String(value)]),
  )
}

/**
 * Given a form request body, will strip out the
 * 'filters.' prefix to return the field name/id and value
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, unknown>}
 */
export const extractFiltersFromBody = (body: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  Object.entries(body).forEach(([key, value]) => {
    if (!key.startsWith('filters.')) return

    const path = key.replace('filters.', '').split('.')
    let current: Record<string, unknown> = result

    path.forEach((segment, index) => {
      const isLast = index === path.length - 1

      if (isLast) {
        current[segment] = value
        return
      }

      if (typeof current[segment] !== 'object' || current[segment] === null) {
        current[segment] = {}
      }

      current = current[segment] as Record<string, unknown>
    })
  })

  return result
}

// ------------------------------------------
// UI to API adapters
// ------------------------------------------

/**
 * Builds a query string from a form body
 *
 * @param {Record<string, unknown>} body
 * @param {Set<string>} [exclude=new Set()]
 * @return {*}  {string}
 */
export const formBodyToQs = (body: Record<string, unknown>, exclude: Set<string> = DEFAULT_EXCLUDED_KEYS): string => {
  const params = new URLSearchParams()

  Object.entries(body).forEach(([key, value]) => {
    if (exclude.has(key)) return
    if (value == null || value === '') return

    if (Array.isArray(value)) {
      const values = value.filter((v) => v != null && v !== '').map((v) => normaliseUiDateIfPresent(String(v)))
      if (values.length > 0) {
        params.set(key, values.join(','))
      }
      return
    }

    params.set(key, normaliseUiDateIfPresent(String(value)))
  })

  return params.toString()
}

/**
 * Converts a form body to an API query object
 * - Excludes specified keys
 * - Drops null / empty values
 * - Collapses arrays to CSV (BE contract)
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {(Record<string, string | string[]>)}
 */
export const formBodyToQueryObject = (
  body: Record<string, unknown>,
  exclude: Set<string> = DEFAULT_EXCLUDED_KEYS,
): Record<string, string> => {
  return Object.entries(body).reduce<Record<string, string>>((acc, [key, value]) => {
    if (exclude.has(key)) return acc
    if (value === undefined || value === null || value === '') return acc

    if (Array.isArray(value)) {
      const values = value.filter((v) => v != null && v !== '').map((v) => normaliseUiDateIfPresent(String(v)))

      if (values.length > 0) {
        acc[key] = values.join(',')
      }

      return acc
    }

    acc[key] = normaliseUiDateIfPresent(String(value))
    return acc
  }, {})
}
