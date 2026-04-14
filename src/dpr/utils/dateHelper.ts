import dayjs from 'dayjs'

/**
 * -------------------------------------------------------------------------------------
 * Date formats
 * -------------------------------------------------------------------------------------
 */

export const UI_INPUT_FORMATS = ['D/M/YYYY', 'DD/MM/YYYY'] as const
const API_FORMAT = 'YYYY-MM-DD'
const UI_OUTPUT_FORMAT = 'DD/MM/YYYY'

/**
 * -------------------------------------------------------------------------------------
 * Validation helpers
 * -------------------------------------------------------------------------------------
 */

export function isValidUiDate(value?: string): boolean {
  if (!value) return false
  return dayjs(value, [...UI_INPUT_FORMATS], true).isValid()
}

/**
 * -------------------------------------------------------------------------------------
 * Transform helpers
 * -------------------------------------------------------------------------------------
 */

export function uiDateToApi(value?: string): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value, [...UI_INPUT_FORMATS], true)
  return parsed.isValid() ? parsed.format(API_FORMAT) : undefined
}

export function apiDateToUi(value?: string): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value, API_FORMAT, true)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : undefined
}

export function apiTimestampToUiDate(value?: string | Date): string | undefined {
  if (!value) return undefined

  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : undefined
}

/**
 * -------------------------------------------------------------------------------------
 * Display helpers
 * -------------------------------------------------------------------------------------
 */

export function formatDateOrUnset(value?: string): string {
  if (!value) return 'unset'
  const parsed = dayjs(value, [...UI_INPUT_FORMATS, API_FORMAT], true)
  return parsed.isValid() ? parsed.format(UI_OUTPUT_FORMAT) : 'unset'
}
