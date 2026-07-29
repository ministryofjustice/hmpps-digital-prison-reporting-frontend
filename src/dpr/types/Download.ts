export interface DownloadPermissionConfig {
  reportId: string
  id: string
}

/**
 * The file formats a report can be downloaded as.
 *
 * Excel type-guesses every value in a csv when the file is opened, so a room number such
 * as `1.5.2` is turned into a date and `007` loses its leading zeros. In xlsx each cell
 * carries its type explicitly, so text stays text.
 */
export const DOWNLOAD_FORMATS = ['csv', 'xlsx'] as const

export type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number]

export const DEFAULT_DOWNLOAD_FORMAT: DownloadFormat = 'csv'

/**
 * Narrows an untrusted value to a supported format, falling back to csv.
 *
 * The result is interpolated into the outbound API path, so it must never be taken
 * straight from the request body.
 */
export const toDownloadFormat = (value: unknown): DownloadFormat =>
  DOWNLOAD_FORMATS.find(format => format === value) ?? DEFAULT_DOWNLOAD_FORMAT

/**
 * The API serves csv from the download endpoint itself and each other format from a
 * suffixed path, e.g. `/download/xlsx`.
 */
export const downloadPathSuffix = (format: DownloadFormat): string => (format === 'csv' ? '' : `/${format}`)
