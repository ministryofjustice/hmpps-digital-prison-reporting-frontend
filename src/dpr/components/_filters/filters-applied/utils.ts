import { Request } from 'express'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import { components } from '../../../types/api'
import { qsToQueryObject } from '../../../utils/queryMappers'
import { getFieldsWithFilters } from '../../../utils/definitionUtils'
import { FilterType } from '../filter-input/enum'
import { formatFilterDisplay } from '../../../utils/filterDisplay'

/**
 * -------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------
 */

type FieldDefinition = components['schemas']['FieldDefinition']

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
  const relativeDuration = query[`${baseKey}.relative-duration`] as string | undefined
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  // Render if anything date-related is set
  if (!relativeDuration && !start && !end) return null

  return {
    displayName: field.display,
    displayValue: formatFilterDisplay(field, {
      values: [],
      ...(start !== undefined && { start }),
      ...(end !== undefined && { end }),
      ...(relativeDuration !== undefined && { relativeDuration }),
    }),
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
  const quickFilter = query[`${baseKey}.quick-filter`] as string | undefined
  const granularity = query[`${baseKey}.granularity`] as string | undefined
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  // Render if anything date-related is set
  if (!quickFilter && !start && !end) return null

  return {
    displayName: field.display,
    displayValue: formatFilterDisplay(field, {
      values: [],
      ...(quickFilter !== undefined && { quickFilter }),
      ...(granularity !== undefined && { granularity }),
      ...(start !== undefined && { start }),
      ...(end !== undefined && { end }),
    }),
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

  const values: string[] = Array.isArray(raw) ? raw : (typeof raw === 'string' && [raw]) || []

  if (!values.length) return null

  return {
    displayName: field.display,
    displayValue: formatFilterDisplay(field, {
      values,
    }),
    reset: {
      keys: [key],
    },
  }
}

/**
 * Date
 */
function buildDateChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const raw = query[key]

  const value: string | undefined = Array.isArray(raw) ? raw[0] : (typeof raw === 'string' && raw) || undefined

  if (!value) return null

  return {
    displayName: field.display,
    displayValue: formatFilterDisplay(field, {
      values: [value],
    }),
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
  const raw = query[key]

  const value: string | undefined = Array.isArray(raw) ? raw[0] : (typeof raw === 'string' && raw) || undefined

  if (!value) return null

  return {
    displayName: field.display,
    displayValue: formatFilterDisplay(field, {
      values: [value],
    }),
    reset: {
      keys: [key],
    },
  }
}
