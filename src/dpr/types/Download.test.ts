import { expect, it, describe } from '@jest/globals'
import { DEFAULT_DOWNLOAD_FORMAT, toDownloadFormat } from './Download'

/**
 * The supported formats and the paths they resolve to are covered end to end by the
 * download journey specs, which click each format button and assert the file that comes
 * back. Only the rejection of untrusted input is tested here - the format buttons never
 * send anything but a known format, so it is not reachable from a user journey.
 */
describe('toDownloadFormat', () => {
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
})
