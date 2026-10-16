import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Granularity } from '../components/_inputs/granular-date-range/types'

dayjs.extend(customParseFormat)

/**
 * --------------------------------------------
 * Date formats
 * --------------------------------------------
 */

export const UI_INPUT_FORMATS = ['D/M/YYYY', 'DD/MM/YYYY'] as const
export const API_FORMAT = 'YYYY-MM-DD'
export const API_MONTH_FORMAT = 'YYYY-MM'
export const API_YEAR_FORMAT = 'YYYY'

export const UI_OUTPUT_FORMAT = 'DD/MM/YYYY'
export const UI_OUTPUT_MONTH_FORMAT = 'MMM YY'
export const UI_OUTPUT_YEAR_FORMAT = 'YYYY'
export const UI_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm'

/**
 * --------------------------------------------
 * Validation helpers
 * --------------------------------------------
 */

export function isValidUiDate(value?: string): boolean {
  if (!value) return false
  return dayjs(value, [...UI_INPUT_FORMATS], true).isValid()
}

/**
 * --------------------------------------------
 * Transform helpers
 * --------------------------------------------
 */

/**
 * DD/MM/YYYY -> YYYY-MM-DD
 *
 * @export
 * @param {string} [value]
 * @return {*}  {(string | undefined)}
 */
export function uiDateToApi(value?: string): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value, [...UI_INPUT_FORMATS], true)
  return parsed.isValid() ? parsed.format(API_FORMAT) : undefined
}

/**
 * YYYY-MM-DD -> DD/MM/YYYY
 *
 * @export
 * @param {string} [value]
 * @return {*}  {(string | undefined)}
 */
export function apiDateToUi(value?: string, granularity?: Granularity): string | undefined {
  if (!value) return undefined

  let apiFormat = API_FORMAT
  let outputFormat = UI_OUTPUT_FORMAT

  if (granularity && granularity === Granularity.MONTHLY) {
    apiFormat = API_MONTH_FORMAT
    outputFormat = UI_OUTPUT_MONTH_FORMAT
  }

  if (granularity && granularity === Granularity.ANNUALLY) {
    apiFormat = API_YEAR_FORMAT
    outputFormat = UI_OUTPUT_YEAR_FORMAT
  }

  const parsed = dayjs(value, apiFormat, true)
  return parsed.isValid() ? parsed.format(outputFormat) : undefined
}

/**
 * TS -> DD/MM/YYYY
 *
 * @export
 * @param {(string | Date)} [value]
 * @return {*}  {(string | undefined)}
 */
export function apiTimestampToUiDate(value?: string | Date): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : undefined
}

/**
 * TS -> DD/MM/YYYY HH:mm
 *
 * @export
 * @param {(string | Date)} [value]
 * @return {*}  {(string | undefined)}
 */
export function apiTimestampToUiDateTime(value?: string | Date): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format(UI_DATE_TIME_FORMAT) : undefined
}

/**
 * --------------------------------------------
 * Display helpers
 * --------------------------------------------
 */

export function formatDateOrUnset(value?: string): string {
  if (!value) return 'unset'
  const parsed = dayjs(value, [...UI_INPUT_FORMATS, API_FORMAT], true)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : 'unset'
}

export function todayAsApiDate() {
  return dayjs().format(API_FORMAT)
}

export function todayAsUiDate() {
  return dayjs().format(UI_OUTPUT_FORMAT)
}

export function todayAsUiDateTime() {
  return dayjs().format(UI_DATE_TIME_FORMAT)
}

export function toDate(value: unknown): Date | undefined {
  if (value instanceof Date) return value
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? undefined : d
  }
  return undefined
}

export const getGranularityFromDateFormat = (dateValue: string): Granularity => {
  if (!dateValue || typeof dateValue !== 'string') return Granularity.NONE

  // Daily: 2024-01-24
  if (dayjs(dateValue, API_FORMAT, true).isValid()) {
    return Granularity.DAILY
  }

  // Monthly: 2024-01
  if (dayjs(dateValue, API_MONTH_FORMAT, true).isValid()) {
    return Granularity.MONTHLY
  }

  // Annually: 2024
  if (dayjs(dateValue, 'YYYY', true).isValid()) {
    return Granularity.ANNUALLY
  }

  return Granularity.NONE
}
