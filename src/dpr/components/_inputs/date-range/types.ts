export enum RelativeDateRange {
  YESTERDAY = 'yesterday',
  TOMORROW = 'tomorrow',
  LAST_WEEK = 'last-week',
  NEXT_WEEK = 'next-week',
  LAST_MONTH = 'last-month',
  NEXT_MONTH = 'next-month',
}

export interface RelativeOption {
  value: string
  text: string
  disabled?: boolean
}

export default RelativeDateRange
