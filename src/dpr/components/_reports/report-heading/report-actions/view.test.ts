import { expect, it, describe } from '@jest/globals'
import * as nunjucks from 'nunjucks'
import * as path from 'path'
import { getActions } from './utils'
import { DownloadActionParams } from './types'

/**
 * Renders the actions macro so the markup the download buttons rely on is covered:
 * a single shared form, and one submit button per format carrying its own `format` value.
 */
describe('dprReportActions view', () => {
  const env = nunjucks.configure(
    [
      path.join(__dirname, '../../../../../..'),
      'node_modules/govuk-frontend/dist/',
      'node_modules/@ministryofjustice/frontend/',
    ],
    { autoescape: true },
  )

  const download: DownloadActionParams = {
    enabled: true,
    canDownload: true,
    csrfToken: 'csrf-token',
    formAction: '/dpr/download-report/reportId/variantId',
  }

  const render = (overrides: Partial<DownloadActionParams> = {}) =>
    env.renderString(
      `{% from "src/dpr/components/_reports/report-heading/report-actions/view.njk" import dprReportActions %}
       {{ dprReportActions(actions) }}`,
      { actions: getActions({ download: { ...download, ...overrides } }) },
    )

  it('renders the download form exactly once even though several buttons submit it', () => {
    const html = render()

    expect(html.match(/id="download-report-form"/g)).toHaveLength(1)
    expect(html).toContain(`action="${download.formAction}"`)
    expect(html).toContain('value="csrf-token"')
  })

  it('renders a submit button per format, each carrying its own format value', () => {
    const html = render()

    expect(html).toContain('name="format"')
    expect(html).toContain('value="xlsx"')
    expect(html).toContain('value="csv"')
    expect(html).toContain('id="dpr-button-downloadable-xlsx"')
    expect(html).toContain('id="dpr-button-downloadable-csv"')
  })

  it('binds every download button to the shared form', () => {
    expect(render().match(/form="download-report-form"/g)).toHaveLength(2)
  })

  // The gated button still posts the form - the controller redirects it to the request
  // form - so the form is rendered, but there is no format to submit yet.
  it('renders a single unformatted button while downloading is gated', () => {
    const html = render({ canDownload: false })

    expect(html.match(/id="download-report-form"/g)).toHaveLength(1)
    expect(html.match(/form="download-report-form"/g)).toHaveLength(1)
    expect(html).toContain('Enable download')
    expect(html).not.toContain('name="format"')
  })

  it('renders no form at all when downloading is turned off for the service', () => {
    const html = render({ enabled: false })

    expect(html).not.toContain('id="download-report-form"')
  })
})
