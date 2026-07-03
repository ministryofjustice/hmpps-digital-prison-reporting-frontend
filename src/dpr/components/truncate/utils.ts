import truncate from 'truncate-html'
import nunjucks from 'nunjucks'

export interface TruncationOptions {
  stringValue: string
  charLength?: number
  showMore?: boolean
  classes?: string
}

export interface TruncationModel {
  fullHtml: string
  truncatedHtml: string
  showMore: boolean
  isTruncated: boolean
  classes?: string | undefined
}

export const initialiseTruncation = ({
  stringValue,
  charLength = 80,
  showMore = true,
  classes,
}: TruncationOptions): TruncationModel => {
  const truncatedHtml = truncate(stringValue, {
    length: charLength,
  })

  const isTruncated = truncatedHtml !== stringValue

  return {
    fullHtml: stringValue,
    truncatedHtml,
    showMore,
    isTruncated,
    classes,
  }
}

export const renderTruncateAsHtml = (options: TruncationOptions): string => {
  const params = initialiseTruncation(options)

  return nunjucks.render('dpr/components/truncate/render.njk', {
    params,
  })
}
