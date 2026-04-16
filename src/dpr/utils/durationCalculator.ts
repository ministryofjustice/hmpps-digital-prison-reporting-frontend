import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import RelativeDateRange from '../components/_inputs/date-range/types'

dayjs.extend(isBetween)

/**
 * Internal date range representation (neutral, unformatted)
 */
export type CalculatedDateRange = {
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
}

/**
 * Subset of RelativeDateRange that can actually be calculated.
 * NONE is intentionally excluded.
 */
export type CalculableRelativeDateRange = Exclude<RelativeDateRange, RelativeDateRange.NONE>

/**
 * Calculator function signature
 */
type DateRangeCalculator = (now: dayjs.Dayjs) => CalculatedDateRange

/**
 * Exhaustive, declarative map of all calculable ranges.
 * No conditionals, no switches.
 */
const RANGE_CALCULATORS: Record<CalculableRelativeDateRange, DateRangeCalculator> = {
  [RelativeDateRange.YESTERDAY]: (now) => ({
    startDate: now.subtract(1, 'day'),
    endDate: now,
  }),

  [RelativeDateRange.TOMORROW]: (now) => ({
    startDate: now,
    endDate: now.add(1, 'day'),
  }),

  [RelativeDateRange.LAST_WEEK]: (now) => ({
    startDate: now.subtract(1, 'week'),
    endDate: now,
  }),

  [RelativeDateRange.NEXT_WEEK]: (now) => ({
    startDate: now,
    endDate: now.add(1, 'week'),
  }),

  [RelativeDateRange.LAST_MONTH]: (now) => ({
    startDate: now.subtract(1, 'month'),
    endDate: now,
  }),

  [RelativeDateRange.NEXT_MONTH]: (now) => ({
    startDate: now,
    endDate: now.add(1, 'month'),
  }),
}

/**
 * Internal pure calculator (cannot be called with NONE)
 */
const calcDatesInternal = (range: CalculableRelativeDateRange): CalculatedDateRange => {
  const now = dayjs().startOf('day')
  return RANGE_CALCULATORS[range](now)
}

/**
 * Public API — accepts the full enum, safely handles NONE.
 * Returns null when no dates should be applied.
 */
export const calcDates = (range: RelativeDateRange): CalculatedDateRange | null => {
  if (range === RelativeDateRange.NONE) {
    return null
  }

  return calcDatesInternal(range)
}

/* -------------------------------------------------------------------------- */
/*                                ADAPTER APIS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Adapter for date inputs (DD/MM/YYYY)
 * Used by: DateRange client / UI code
 */
export const calcDatesForInputs = (range: RelativeDateRange): { start: string; end: string } | null => {
  const result = calcDates(range)
  if (!result) return null

  return {
    start: result.startDate.format('DD/MM/YYYY'),
    end: result.endDate.format('DD/MM/YYYY'),
  }
}

/**
 * Adapter for filter definitions (YYYY-MM-DD)
 * Used by: DateRange utils / filters / API payloads
 */
export const calcDatesForFilterDefinition = (range: RelativeDateRange): { start: string; end: string } | null => {
  const result = calcDates(range)
  if (!result) return null

  return {
    start: result.startDate.format('YYYY-MM-DD'),
    end: result.endDate.format('YYYY-MM-DD'),
  }
}
