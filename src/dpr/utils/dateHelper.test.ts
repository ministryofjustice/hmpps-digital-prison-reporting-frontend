import { expect, describe } from '@jest/globals'
import {
  isValidUiDate,
  uiDateToApi,
  apiDateToUi,
  apiTimestampToUiDate,
  apiTimestampToUiDateTime,
  formatDateOrUnset,
} from './dateHelper'

describe('dateHelper', () => {
  describe('validation helpers', () => {
    describe('isValidUiDate', () => {
      it('returns true for valid UI date formats', () => {
        expect(isValidUiDate('1/1/2024')).toBe(true)
        expect(isValidUiDate('01/01/2024')).toBe(true)
        expect(isValidUiDate('31/12/2024')).toBe(true)
      })

      it('returns false for invalid dates or formats', () => {
        expect(isValidUiDate('2024-01-01')).toBe(false)
        expect(isValidUiDate('32/01/2024')).toBe(false)
        expect(isValidUiDate('')).toBe(false)
        expect(isValidUiDate(undefined)).toBe(false)
      })
    })
  })

  describe('UI to API transformations', () => {
    describe('uiDateToApi', () => {
      it('converts valid UI dates to API format', () => {
        expect(uiDateToApi('01/02/2024')).toBe('2024-02-01')
        expect(uiDateToApi('1/2/2024')).toBe('2024-02-01')
      })

      it('returns undefined for invalid values', () => {
        expect(uiDateToApi('2024-02-01')).toBeUndefined()
        expect(uiDateToApi('invalid')).toBeUndefined()
        expect(uiDateToApi(undefined)).toBeUndefined()
      })
    })

    describe('apiDateToUi', () => {
      it('converts valid API dates to UI format', () => {
        expect(apiDateToUi('2024-02-01')).toBe('01/02/2024')
      })

      it('returns undefined for invalid values', () => {
        expect(apiDateToUi('01/02/2024')).toBeUndefined()
        expect(apiDateToUi('invalid')).toBeUndefined()
        expect(apiDateToUi(undefined)).toBeUndefined()
      })
    })
  })

  describe('timestamp formatting', () => {
    describe('apiTimestampToUiDate', () => {
      it('formats ISO timestamps to UI date', () => {
        expect(apiTimestampToUiDate('2024-02-01T10:15:00Z')).toBe('01/02/2024')
      })

      it('formats Date objects to UI date', () => {
        const date = new Date('2024-02-01T10:15:00Z')
        expect(apiTimestampToUiDate(date)).toBe('01/02/2024')
      })

      it('returns undefined for invalid values', () => {
        expect(apiTimestampToUiDate('invalid')).toBeUndefined()
        expect(apiTimestampToUiDate(undefined)).toBeUndefined()
      })
    })

    describe('apiTimestampToUiDateTime', () => {
      it('formats ISO timestamps to UI date time', () => {
        expect(apiTimestampToUiDateTime('2024-02-01T10:15:00Z')).toBe('01/02/2024 10:15')
      })

      it('formats Date objects to UI date time', () => {
        const date = new Date('2024-02-01T10:15:00Z')
        expect(apiTimestampToUiDateTime(date)).toBe('01/02/2024 10:15')
      })

      it('returns undefined for invalid values', () => {
        expect(apiTimestampToUiDateTime('invalid')).toBeUndefined()
        expect(apiTimestampToUiDateTime(undefined)).toBeUndefined()
      })
    })
  })

  describe('display helpers', () => {
    describe('formatDateOrUnset', () => {
      it('formats valid dates to UI output format', () => {
        expect(formatDateOrUnset('01/02/2024')).toBe('01/02/2024')
        expect(formatDateOrUnset('2024-02-01')).toBe('01/02/2024')
      })

      it('returns "unset" for invalid or missing values', () => {
        expect(formatDateOrUnset('invalid')).toBe('unset')
        expect(formatDateOrUnset('')).toBe('unset')
        expect(formatDateOrUnset(undefined)).toBe('unset')
      })
    })
  })
})
