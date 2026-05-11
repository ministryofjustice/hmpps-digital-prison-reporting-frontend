import { FilterType } from '../components/_filters/filter-input/enum'
import RelativeDateRange from '../components/_inputs/date-range/types'
import { mapRelativeValue } from '../components/_inputs/date-range/utils'
import { components } from '../types/api'
import { apiDateToUi, formatDateOrUnset } from './dateHelper'

type FilterDisplayState = {
  values: string[]
  start?: string
  end?: string
  relativeDuration?: string
  quickFilter?: string
  granularity?: string
}

/**
 * Formats the filter display values into a consistant format
 *
 * - Used in Applied filter chips
 * - My reports selected filters
 * - Request details - applied filters
 *
 * @export
 * @param {components['schemas']['FieldDefinition']} field
 * @param {FilterDisplayState} state
 * @return {*}  {string}
 */
export function formatFilterDisplay(
  field: components['schemas']['FieldDefinition'],
  state: FilterDisplayState,
): string {
  const parts: string[] = []
  const filterType = field.filter?.type.toLowerCase()

  // granularDateRange
  if (filterType === FilterType.granularDateRange.toLowerCase()) {
    const granular = formatGranularDateRangeDisplay(state.quickFilter, state.start, state.end, state.granularity)

    if (granular) {
      parts.push(granular)
    }
  }

  // Standard date range
  else if (filterType === FilterType.dateRange.toLowerCase() && (state.start || state.end || state.relativeDuration)) {
    const dateRange = formatDateRangeDisplay(state.start, state.end, state.relativeDuration)

    if (dateRange) {
      parts.push(dateRange)
    }
  }

  // Other filter values (radio, multiselect, etc.)
  const valuePart = formatFilterValues(field, state.values)
  if (valuePart) {
    parts.push(valuePart)
  }

  return parts.join(' / ')
}

/**
 * Formats none date-range filter types
 *
 * @param {components['schemas']['FieldDefinition']} field
 * @param {string[]} rawValues
 * @return {*}  {string}
 */
function formatFilterValues(field: components['schemas']['FieldDefinition'], rawValues: string[]): string {
  const { filter } = field
  if (!filter || rawValues.length === 0) return ''

  switch (filter.type.toLowerCase()) {
    case FilterType.multiselect.toLowerCase():
      return formatMultiselect(filter, rawValues)

    case FilterType.radio.toLowerCase():
    case FilterType.select.toLowerCase():
    case FilterType.autocomplete.toLowerCase():
      return resolveStaticOption(filter, rawValues[0])

    case FilterType.date.toLowerCase():
      return apiDateToUi(rawValues[0]) ?? rawValues[0]

    default:
      return rawValues[0]
  }
}

// ###################### INPUT TYPES ########################

// -----------------------------------------------------------
// MULTISELECT
// -----------------------------------------------------------

function formatMultiselect(filter: components['schemas']['FilterDefinition'], rawValues: string[]): string {
  const split = rawValues.flatMap((v) => v.split(',').map((s) => s.trim()))
  const labels = split.map((v) => resolveStaticOption(filter, v))

  const MAX = 3
  return labels.length > MAX ? `${labels.slice(0, MAX).join(', ')} + ${labels.length - MAX} more` : labels.join(', ')
}

// -----------------------------------------------------------
// RADIO & SELECT
// -----------------------------------------------------------

function resolveStaticOption(filter: components['schemas']['FilterDefinition'], value: string): string {
  const opt = filter.staticOptions?.find((o) => o.name === value)
  return opt?.display ?? value
}

// -----------------------------------------------------------
// RELATIVE DATE RANGE
// -----------------------------------------------------------

export function formatDateRangeDisplay(start?: string, end?: string, relativeDuration?: string): string {
  const parts: string[] = []

  // Always show explicit range if either bound exists
  if (start || end) {
    parts.push(`${formatDateOrUnset(start)} - ${formatDateOrUnset(end)}`)
  }

  // Append relative duration if present and meaningful
  if (relativeDuration && relativeDuration !== 'None') {
    parts.push(humaniseRelativeDuration(relativeDuration))
  }

  return parts.join(' / ')
}

const humaniseRelativeDuration = (value: string): string => {
  // Prefer domain-aware mapping if available
  const mapped = mapRelativeValue(value as RelativeDateRange)
  if (mapped) {
    return mapped
  }

  // Safe fallback
  return value.charAt(0).toUpperCase() + value.slice(1).replaceAll('-', ' ')
}

// -----------------------------------------------------------
// GRANULAR DATE RANGE
// -----------------------------------------------------------

function formatGranularDateRangeDisplay(
  quickFilter?: string | string[],
  start?: string,
  end?: string,
  granularity?: string,
): string {
  const gran = granularity ?? 'unset'

  if (quickFilter && quickFilter !== 'None') {
    return `${humanise(quickFilter)} / ${gran}`
  }

  if (start || end) {
    return `${formatDateOrUnset(start)} - ${formatDateOrUnset(end)} / ${gran}`
  }

  return ''
}

function humanise(value: string | string[]): string {
  return String(value).replace(/-/g, ' ')
}
