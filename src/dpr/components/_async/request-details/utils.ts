import { components } from '../../../types/api'
import { FieldSummaryState, QuerySummaryItem } from './types'
import { getField, getFieldDisplayName } from '../../../utils/definitionUtils'
import { FilterType } from '../../_filters/filter-input/enum'
import AutocompleteUtils from '../../_inputs/autocomplete-text-input/utils'

/**
 * Collects filter-related summary state from the request body,
 * grouped by fieldId.
 *
 */
const collectFieldSummaryState = (body: Record<string, unknown>): Map<string, FieldSummaryState> => {
  const fieldSummaryMap = new Map<string, FieldSummaryState>()

  Object.entries(body).forEach(([key, value]) => {
    if (value == null || value === '') return
    if (!key.startsWith('filters.')) return
    if (value === 'no-filter') return

    const [, fieldId, suffix] = key.split('.')
    const state = fieldSummaryMap.get(fieldId) ?? { values: [] }

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
      default:
        state.values.push(String(value))
    }

    fieldSummaryMap.set(fieldId, state)
  })

  return fieldSummaryMap
}

/**
 * Builds UI-ready summary rows from grouped filter state.
 *
 */
const buildGroupedFilterSummaries = (
  fieldSummaryMap: Map<string, FieldSummaryState>,
  fields: components['schemas']['FieldDefinition'][],
): QuerySummaryItem[] => {
  const summary: QuerySummaryItem[] = []

  Array.from(fieldSummaryMap.entries()).forEach(([fieldId, state]) => {
    const field = getField(fields, fieldId)
    const displayName = getFieldDisplayName(fields, fieldId) ?? fieldId
    const parts: string[] = []

    // Date range
    if (state.start && state.end) {
      parts.push(`${state.start} - ${state.end}`)
    }

    // Relative duration (human-readable)
    if (state.relativeDuration) {
      parts.push(state.relativeDuration.charAt(0).toUpperCase() + state.relativeDuration.slice(1).replaceAll('-', ' '))
    }

    // Other filter values
    if (state.values.length > 0) {
      const displayValues =
        field?.filter?.type === FilterType.autocomplete.toLowerCase()
          ? state.values.map((v) => AutocompleteUtils.getDisplayValue(field.filter!, v))
          : state.values

      parts.push(...displayValues)
    }

    summary.push({
      name: displayName,
      value: parts.join(' / '),
    })
  })

  return summary
}

/**
 * Builds summary rows related to sorting.
 *
 * Supports:
 * - single or multiple sort columns
 * - global sort direction
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

/**
 * Master orchestrator.
 *
 * Builds the full query summary displayed to the user
 * by composing smaller, focused helpers.
 */
export const buildQuerySummary = (
  body: Record<string, unknown>,
  fields: components['schemas']['FieldDefinition'][],
): QuerySummaryItem[] => {
  const fieldSummaryMap = collectFieldSummaryState(body)
  const filterSummaries = buildGroupedFilterSummaries(fieldSummaryMap, fields)
  const sortSummaries = buildSortSummaries(body, fields)

  return [...filterSummaries, ...sortSummaries]
}
