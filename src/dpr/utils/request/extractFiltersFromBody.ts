/**
 * Given a form request body, will strip out the
 * 'filters.' prefix to return the field name/id and value
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, unknown>}
 */
export const extractFiltersFromBody = (body: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  Object.entries(body).forEach(([key, value]) => {
    if (!key.startsWith('filters.')) return

    const path = key.replace('filters.', '').split('.')
    let current: Record<string, unknown> = result

    path.forEach((segment, index) => {
      const isLast = index === path.length - 1

      if (isLast) {
        current[segment] = value
        return
      }

      if (typeof current[segment] !== 'object' || current[segment] === null) {
        current[segment] = {}
      }

      current = current[segment] as Record<string, unknown>
    })
  })

  return result
}
