import { expect, it, describe } from '@jest/globals'
import { getActions } from './utils'
import { DownloadActionParams } from './types'

describe('getActions - download buttons', () => {
  const download: DownloadActionParams = {
    enabled: true,
    canDownload: true,
    csrfToken: 'csrf-token',
    formAction: '/dpr/download-report/reportId/variantId',
  }

  const downloadActions = (overrides: Partial<DownloadActionParams> = {}) =>
    getActions({ download: { ...download, ...overrides } })

  it('offers a button per format once downloading is permitted, Excel first', () => {
    const actions = downloadActions()

    expect(actions.map(action => action.text)).toEqual(['Download Excel', 'Download CSV'])
    expect(actions.map(action => action.id)).toEqual(['dpr-button-downloadable-xlsx', 'dpr-button-downloadable-csv'])
  })

  it('submits the chosen format with the shared download form', () => {
    const actions = downloadActions()

    expect(actions.map(action => [action.name, action.value])).toEqual([
      ['format', 'xlsx'],
      ['format', 'csv'],
    ])
    // All formats post to the same endpoint - only the submitted value differs.
    actions.forEach(action => expect(action.attributes?.formAction).toEqual(download.formAction))
  })

  // WCAG 2.5.3: the accessible name must contain the visible label, so a speech-input
  // user can activate the button by saying what they can see.
  it('gives each format an accessible name containing its visible label', () => {
    const actions = downloadActions()

    expect(actions.map(action => action.ariaLabelText)).toEqual(['Download Excel report', 'Download CSV report'])
    actions.forEach(action => expect(action.ariaLabelText).toContain(action.text))
  })

  // Before the feedback request is submitted there is nothing to choose between yet, so
  // two buttons both reading "Enable download" would be meaningless.
  it('offers a single enable button while downloading is still gated', () => {
    const actions = downloadActions({ canDownload: false })

    expect(actions).toHaveLength(1)
    expect(actions[0].text).toEqual('Enable download')
    expect(actions[0].id).toEqual('dpr-button-downloadable')
    expect(actions[0].name).toBeUndefined()
  })

  it('disables the format buttons when downloading is turned off for the service', () => {
    const actions = downloadActions({ enabled: false })

    expect(actions.map(action => action.disabled)).toEqual([true, true])
    expect(actions.map(action => action.ariaLabelText)).toEqual([
      'Download Excel report, disabled',
      'Download CSV report, disabled',
    ])
  })

  it('adds no download buttons when there is no download config', () => {
    expect(getActions({})).toEqual([])
  })
})
