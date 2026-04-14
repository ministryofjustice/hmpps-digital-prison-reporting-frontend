/**
 * Given a form request body, will strip out the
 * 'filters.' prefix to return the field name/id and value
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, unknown>}
 */
export const extractFiltersFromBody = (body: Record<string, unknown>): Record<string, unknown> =>
  Object.entries(body).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (!key.startsWith('filters.')) return acc

    const path = key.replace('filters.', '').split('.')
    const target = path.slice(0, -1).reduce<Record<string, unknown>>((current, segment) => {
      if (typeof current[segment] !== 'object' || current[segment] === null) {
        current[segment] = {}
      }
      return current[segment] as Record<string, unknown>
    }, acc)

    target[path[path.length - 1]] = value
    return acc
  }, {})
