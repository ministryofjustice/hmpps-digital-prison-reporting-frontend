// eslint-disable no-useless-escape

import { DateType } from './types'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import logger from '../logger'

export default class DateMapper {
  private isoDateRegEx = /^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]))/
  private localDateRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  private localDateShortYearRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/
  private localDateTimeRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4} [0-2]\d:[0-5]\d$/
  private localDateTimeShortYearRegEx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2} [0-2]\d:[0-5]\d$/

  private isoFormat = 'YYYY-MM-DD'
  private localDateFormat = 'DD/MM/YYYY'
  private localDateShortYearFormat = 'DD/MM/YY'
  private localDateTimeFormat = 'DD/MM/YYYY HH:mm'
  private localDateTimeShortYearFormat = 'DD/MM/YY HH:mm'

  getDateType(value: string): DateType  {
    if (value) {
      if (value.match(this.isoDateRegEx)) {
        return 'iso'
      }

      if (value.match(this.localDateRegEx)) {
        return 'local-date'
      }

      if (value.match(this.localDateShortYearRegEx)) {
        return 'local-date-short-year'
      }

      if (value.match(this.localDateTimeRegEx)) {
        return 'local-datetime'
      }

      if (value.match(this.localDateTimeShortYearRegEx)) {
        return 'local-datetime-short-year'
      }
    }

    return 'none'
  }

  getDateWrapper(value: string): Dayjs  {
    dayjs.extend(customParseFormat)

    switch (this.getDateType(value)) {
      case 'iso':
        return dayjs(value)
      case 'local-date':
        return dayjs(value, this.localDateFormat)
      case 'local-date-short-year':
        return dayjs(value, this.localDateShortYearFormat)
      case 'local-datetime':
        return dayjs(value, this.localDateTimeFormat)
      case 'local-datetime-short-year':
        return dayjs(value, this.localDateTimeShortYearFormat)
    }

    return null
  }

  isDate(value: string): boolean {
    return this.getDateType(value) !== 'none'
  }

  toDateString(value: string, type: DateType): string {
    const dateWrapper = this.getDateWrapper(value)

    if (dateWrapper) {
      switch (type) {
        case 'iso':
          return dateWrapper.format(this.isoFormat)
        case 'local-date':
          return dateWrapper.format(this.localDateFormat)
        case 'local-date-short-year':
          return dateWrapper.format(this.localDateShortYearFormat)
        case 'local-datetime':
          return dateWrapper.format(this.localDateTimeFormat)
        case 'local-datetime-short-year':
          return dateWrapper.format(this.localDateTimeShortYearFormat)
      }
    }

    if (value) {
      logger.warn(`Could not map non-date value : ${value}`)
    }

    return null
  }
}