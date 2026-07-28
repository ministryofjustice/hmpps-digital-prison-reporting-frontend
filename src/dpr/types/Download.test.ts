import { expect, it, describe } from '@jest/globals'
import { DEFAULT_DOWNLOAD_FORMAT, downloadPathSuffix, toDownloadFormat } from './Download'

describe('Download formats', () => {
  describe('toDownloadFormat', () => {
    it.each(['csv', 'xlsx'])('accepts the supported format %s', format => {
      expect(toDownloadFormat(format)).toEqual(format)
    })

    // The result is interpolated into the outbound API path, so anything unrecognised
    // must not survive.
    it.each([
      ['an unknown format', 'pdf'],
      ['a path traversal attempt', '../../admin'],
      ['a wrongly cased format', 'XLSX'],
      ['an empty string', ''],
      ['undefined', undefined],
      ['null', null],
      ['a number', 1],
      ['an object', { format: 'xlsx' }],
    ])('falls back to the default for %s', (_description, value) => {
      expect(toDownloadFormat(value)).toEqual(DEFAULT_DOWNLOAD_FORMAT)
    })

    it('defaults to csv, matching the format the API serves from the unsuffixed path', () => {
      expect(DEFAULT_DOWNLOAD_FORMAT).toEqual('csv')
    })
  })

  describe('downloadPathSuffix', () => {
    it('adds no suffix for csv', () => {
      expect(downloadPathSuffix('csv')).toEqual('')
    })

    it('adds the format as a path segment for xlsx', () => {
      expect(downloadPathSuffix('xlsx')).toEqual('/xlsx')
    })
  })
})
