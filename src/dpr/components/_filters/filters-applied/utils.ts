import { Request } from 'express'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import { components } from '../../../types/api'
import { apiDateToUi, formatDateOrUnset } from '../../../utils/dateHelper'
import { qsToQueryObject } from '../../../utils/queryMappers'
import { getFieldsWithFilters } from '../../../utils/definitionUtils'
import { mapRelativeValue } from '../../_inputs/date-range/utils'
import RelativeDateRange from '../../_inputs/date-range/types'
import { FilterType } from '../filter-input/enum'

/**
 * -------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------
 */

type FieldDefinition = components['schemas']['FieldDefinition']
type FilterDefinition = components['schemas']['FilterDefinition']

export type AppliedFilterChip = {
  displayName: string
  displayValue: string
  reset: {
    keys: string[]
  }
}

type QueryParams = Record<string, string | string[] | undefined>

/**
 * -------------------------------------------------------------------------------------
 * Public API
 * -------------------------------------------------------------------------------------
 */

export function buildAppliedFilters(
  req: Request,
  sessionKey: { id: string; reportId: string; tableId?: string },
  fields: components['schemas']['FieldDefinition'][],
) {
  const currentReportFiltersSearch = getActiveJourneyValue(req, sessionKey, 'currentReportFiltersSearch')

  let appliedFilters: AppliedFilterChip[] = []
  if (currentReportFiltersSearch) {
    const query = qsToQueryObject(currentReportFiltersSearch, 'filters.')
    const filterFields = getFieldsWithFilters(fields)
    appliedFilters = buildAppliedFilterChips(query, filterFields)
  }

  return appliedFilters
}

export function buildAppliedFilterChips(query: QueryParams, fields: FieldDefinition[]): AppliedFilterChip[] {
  return fields
    .filter((field) => Boolean(field.filter))
    .map((field) => buildChipForField(field, query))
    .filter(Boolean) as AppliedFilterChip[]
}

/**
 * -------------------------------------------------------------------------------------
 * Orchestrator (semantic parity with Selected Filters)
 * -------------------------------------------------------------------------------------
 */

function buildChipForField(field: FieldDefinition, query: QueryParams): AppliedFilterChip | null {
  const filter = field.filter!
  const baseKey = `filters.${field.name}`

  switch (filter.type.toLowerCase()) {
    case FilterType.dateRange.toLowerCase():
      return buildDateRangeChip(field, baseKey, query)

    case FilterType.granularDateRange.toLowerCase():
      return buildGranularDateRangeChip(field, baseKey, query)

    case FilterType.multiselect.toLowerCase():
      return buildMultiSelectChip(field, baseKey, query)

    case FilterType.date.toLowerCase():
      return buildDateChip(field, baseKey, query)

    default:
      return buildSingleValueChip(field, baseKey, query)
  }
}

/**
 * -------------------------------------------------------------------------------------
 * Builders
 * -------------------------------------------------------------------------------------
 */

/**
 * Date range
 * - Renders if either bound exists
 * - Missing bounds rendered as 'unset'
 */
function buildDateRangeChip(field: FieldDefinition, baseKey: string, query: QueryParams): AppliedFilterChip | null {
  const duration = query[`${baseKey}.relative-duration`] as string | undefined
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  // Render if anything date-related is set
  if (!duration && !start && !end) return null

  // Always show the explicit range
  let displayValue = `${formatDateOrUnset(start)} - ${formatDateOrUnset(end)}`

  // Append duration if present
  if (duration && duration !== 'None') {
    const durationLabel = getDisplayLabel(field.filter!, duration)
    displayValue = `${displayValue} / ${durationLabel}`
  }

  return {
    displayName: field.display,
    displayValue,
    reset: {
      keys: Object.keys(query).filter((key) => key.startsWith(baseKey)),
    },
  }
}

/**
 * Granular date range
 * - Renders if quick-filter OR either bound exists
 * - Quick-filter takes precedence
 * - Missing values rendered as 'unset'
 */
function buildGranularDateRangeChip(
  field: FieldDefinition,
  baseKey: string,
  query: QueryParams,
): AppliedFilterChip | null {
  const quick = query[`${baseKey}.quick-filter`]
  const granularity = query[`${baseKey}.granularity`]
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  if (!quick && !start && !end) return null

  let displayValue: string

  if (quick && quick !== 'None') {
    displayValue = `${humanise(quick)} / ${granularity ?? 'unset'}`
  } else {
    displayValue = `${formatDateOrUnset(start)} - ${formatDateOrUnset(end)} / ${granularity ?? 'unset'}`
  }

  return {
    displayName: field.display,
    displayValue,
    reset: {
      keys: Object.keys(query).filter((key) => key.startsWith(baseKey)),
    },
  }
}

/**
 * Multiselect
 * - Combined into single chip
 * - Truncated after 3 values
 */
function buildMultiSelectChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const raw = query[key]

  let values: string[] = []
  if (Array.isArray(raw)) {
    values = raw
  } else if (raw) {
    values = [raw]
  }

  if (!values.length) return null

  const labels = values.map((value) => getDisplayLabel(field.filter!, value))

  const displayValue =
    labels.length > 3 ? `${labels.slice(0, 3).join(', ')} + ${labels.length - 3} more` : labels.join(', ')

  return {
    displayName: field.display,
    displayValue,
    reset: {
      keys: [key],
    },
  }
}

/**
 * Date
 */
function buildDateChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const value = query[key]
  if (!value || typeof value !== 'string') return null

  const dateValue = apiDateToUi(value)
  return {
    displayName: field.display,
    displayValue: dateValue || value,
    reset: {
      keys: [key],
    },
  }
}

/**
 * Single value
 * - radio / select / text / autocomplete
 */
function buildSingleValueChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const value = query[key]
  if (!value) return null

  return {
    displayName: field.display,
    displayValue: getDisplayLabel(field.filter!, String(value)),
    reset: {
      keys: [key],
    },
  }
}

/**
 * -------------------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------------------
 */

function getDisplayLabel(filter: FilterDefinition, value: string): string {
  if (filter.type === 'daterange') {
    const mapped = mapRelativeValue(<RelativeDateRange>value)
    if (mapped) {
      return mapped
    }
  }
  const staticOption = filter.staticOptions?.find((option) => option.name === value)

  return staticOption?.display ?? value
}

function humanise(value: string | string[]): string {
  return String(value).replace(/-/g, ' ')
}
