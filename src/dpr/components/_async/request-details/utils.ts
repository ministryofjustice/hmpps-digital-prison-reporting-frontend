import { components } from '../../../types/api'
import { FilterDisplayState, QuerySummaryItem } from './types'
import { getField, getFieldDisplayName } from '../../../utils/definitionUtils'
import { formatFilterDisplay } from '../../../utils/filterDisplay'

/**
 * Builds the query summary
 *
 * @param {Record<string, unknown>} body
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {QuerySummaryItem[]}
 */
export const buildQuerySummary = (
  body: Record<string, unknown>,
  fields: components['schemas']['FieldDefinition'][],
): QuerySummaryItem[] => {
  const filterStateByField = collectFilterState(body)

  const filterSummaries = Array.from(filterStateByField.entries())
    .map(([fieldId, state]) => {
      const field = getField(fields, fieldId)
      if (!field) return null

      const value = formatFilterDisplay(field, state)
      if (!value) return null

      return {
        name: getFieldDisplayName(fields, fieldId) ?? fieldId,
        value,
      }
    })
    .filter(Boolean) as QuerySummaryItem[]

  const sortSummaries = buildSortSummaries(body, fields)

  return [...filterSummaries, ...sortSummaries]
}

/**
 * Builds the filter state into predictable format
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Map<string, FilterDisplayState>}
 */
const collectFilterState = (body: Record<string, unknown>): Map<string, FilterDisplayState> => {
  const map = new Map<string, FilterDisplayState>()

  Object.entries(body).forEach(([key, value]) => {
    if (value == null || value === '' || value === 'no-filter') return
    if (!key.startsWith('filters.')) return

    const [, fieldId, suffix] = key.split('.')
    const state = map.get(fieldId) ?? { values: [] }

    switch (suffix) {
      case 'start':
        state.start = String(value)
        break
      case 'end':
        state.end = String(value)
        break
      case 'relative-duration':
        state.relativeDuration = String(value)
        break
      case 'quick-filter':
        state.quickFilter = String(value)
        break
      case 'granularity':
        state.granularity = String(value)
        break
      default:
        state.values.push(String(value))
    }

    map.set(fieldId, state)
  })

  return map
}

/**
 * Builds the sort summary
 *
 * @param {Record<string, unknown>} body
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {QuerySummaryItem[]}
 */
const buildSortSummaries = (
  body: Record<string, unknown>,
  fields: components['schemas']['FieldDefinition'][],
): QuerySummaryItem[] => {
  const summary: QuerySummaryItem[] = []

  Object.entries(body).forEach(([key, value]) => {
    if (value == null || value === '') return

    if (key === 'sortColumn') {
      const columns = Array.isArray(value) ? value.map(String) : [String(value)]
      const displayNames = columns.map((col) => getField(fields, col)?.display ?? col)
      summary.push({
        name: 'Sort Column',
        value: displayNames.join(', '),
      })
    }

    if (key === 'sortedAsc') {
      summary.push({
        name: 'Sort Direction',
        value: value === 'true' ? 'Ascending' : 'Descending',
      })
    }
  })

  return summary
}
