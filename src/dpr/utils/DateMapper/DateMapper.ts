import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DateType } from './types'
import logger from '../logger'

export default class DateMapper {
  private isoDateRegEx = /^(\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01]))/

  private localDateRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/

  private localDateShortYearRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{2}$/

  private localDateTimeRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4} [0-2]\d:[0-5]\d$/

  private localDateTimeShortYearRegEx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{2} [0-2]\d:[0-5]\d$/

  private isoFormat = 'YYYY-MM-DD'

  private localDateFormatInput = 'D/M/YYYY'

  private localDateFormatOutput = 'DD/MM/YYYY'

  private localDateShortYearFormatInput = 'D/M/YY'

  private localDateShortYearFormatOutput = 'DD/MM/YY'

  private localDateTimeFormatInput = 'D/M/YYYY HH:mm'

  private localDateTimeFormatOutput = 'DD/MM/YYYY HH:mm'

  private localDateTimeShortYearFormatInput = 'D/M/YY HH:mm'

  private localDateTimeShortYearFormatOutput = 'DD/MM/YY HH:mm'

  private localDateFormatMonthYear = 'MMM YY'

  private localDateFormatYear = 'YYYY'

  getDateType(value: string): DateType {
    if (value && value.match) {
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

  getDateWrapper(value: string): Dayjs | null {
    dayjs.extend(customParseFormat)

    switch (this.getDateType(value)) {
      case 'iso':
        return dayjs(value)
      case 'local-date':
        return dayjs(value, this.localDateFormatInput)
      case 'local-date-short-year':
        return dayjs(value, this.localDateShortYearFormatInput)
      case 'local-datetime':
        return dayjs(value, this.localDateTimeFormatInput)
      case 'local-datetime-short-year':
        return dayjs(value, this.localDateTimeShortYearFormatInput)
      default:
        return null
    }
  }

  isDate(value: string): boolean {
    return this.getDateType(value) !== 'none'
  }

  toDateString(value: string, type: DateType): string | null {
    const dateWrapper = this.getDateWrapper(value)

    if (dateWrapper) {
      switch (type) {
        case 'iso':
          return dateWrapper.format(this.isoFormat)
        case 'local-date':
          return dateWrapper.format(this.localDateFormatOutput)
        case 'local-date-short-year':
          return dateWrapper.format(this.localDateShortYearFormatOutput)
        case 'local-datetime':
          return dateWrapper.format(this.localDateTimeFormatOutput)
        case 'local-datetime-short-year':
          return dateWrapper.format(this.localDateTimeShortYearFormatOutput)
        default:
          logger.warn(`Invalid date type: ${type}`)
          return null
      }
    }

    if (value) {
      logger.warn(`Could not map non-date value : ${value}`)
    }
    return null
  }
}
