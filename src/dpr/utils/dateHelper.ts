import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/**
 * --------------------------------------------
 * Date formats
 * --------------------------------------------
 */

export const UI_INPUT_FORMATS = ['D/M/YYYY', 'DD/MM/YYYY'] as const
const API_FORMAT = 'YYYY-MM-DD'
const UI_OUTPUT_FORMAT = 'DD/MM/YYYY'
const UI_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm'

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
export function apiDateToUi(value?: string): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value, API_FORMAT, true)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : undefined
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
