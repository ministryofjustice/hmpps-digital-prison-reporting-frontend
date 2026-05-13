/**
 * Lightweight HTTP utility for fetching server-rendered HTML fragments
 * and handling common concerns like CSRF tokens and response parsing.
 */

class HtmlClient {
  /**
   * Fetches an HTML fragment from the server and parses it into a DocumentFragment.
   * Returns null if the response indicates no content change (204).
   *
   * @static
   * @param {string} url
   * @param {string} [csrfToken]
   * @return {*}  {(Promise<DocumentFragment | null>)}
   * @memberof HtmlClient
   */
  static async fetchFragment(url: string, csrfToken?: string): Promise<DocumentFragment | null> {
    const res = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'text/html',
        ...(csrfToken ? { 'CSRF-Token': csrfToken } : {}),
      },
    })

    if (res.status === 204) return null

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`)
    }

    const html = await res.text()

    const template = document.createElement('template')
    template.innerHTML = html.trim()

    return template.content
  }

  /**
   * Extracts the CSRF token from a DOM element's dataset.
   * Throws an error if the token is not present.
   *
   * @static
   * @param {HTMLElement} element
   * @return {*}  {string}
   * @memberof HtmlClient
   */
  static getCsrfToken(element: HTMLElement): string {
    const token = element.dataset['csrfToken']

    if (!token) {
      throw new Error('No csrf token provided')
    }

    return token
  }
}

export default HtmlClient
