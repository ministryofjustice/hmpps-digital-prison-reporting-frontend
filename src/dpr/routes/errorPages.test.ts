import { describe, expect, test } from '@jest/globals'
import nunjucks from 'nunjucks'
import path from 'path'

const DIGITAL_PRISON_SERVICES_URL = 'https://digital-prison.example.com'
const HOME_PAGE_LINK = 'Go to digital services home page'

const env = nunjucks.configure([path.join(__dirname, '../..')], {
  autoescape: true,
  noCache: true,
})

const renderErrorPage = (template: 'authError' | 'serviceProblem', locals: Record<string, unknown> = {}) =>
  env.render(`dpr/routes/${template}.njk`, {
    layoutPath: 'dpr/routes/error-pages.test-layout.njk',
    digitalPrisonServicesUrl: DIGITAL_PRISON_SERVICES_URL,
    ...locals,
  })

describe.each(['authError', 'serviceProblem'] as const)('%s error page', template => {
  test('shows the digital services home page link for prison services', () => {
    const html = renderErrorPage(template, { isProbationService: false })

    expect(html).toContain(HOME_PAGE_LINK)
    expect(html).toContain(DIGITAL_PRISON_SERVICES_URL)
  })

  test('hides the digital services home page link for probation services', () => {
    const html = renderErrorPage(template, { isProbationService: true })

    expect(html).not.toContain(HOME_PAGE_LINK)
    expect(html).not.toContain(DIGITAL_PRISON_SERVICES_URL)
  })

  test('defaults to prison behaviour when isProbationService is not set', () => {
    const html = renderErrorPage(template)

    expect(html).toContain(HOME_PAGE_LINK)
    expect(html).toContain(DIGITAL_PRISON_SERVICES_URL)
  })
})
