/**
 * Given a form request body, will strip out the
 * 'filters.' prefix to return the field name/id and value
 *
 * @param {Record<string, unknown>} body
 * @return {*}  {Record<string, unknown>}
 */
export const extractFiltersFromBody = (body: Record<string, unknown>): Record<string, unknown> =>
  Object.entries(body).reduce<Record<string, any>>((acc, [key, value]) => {
    if (!key.startsWith('filters.')) return acc

    const path = key.replace('filters.', '').split('.')
    let target = acc

    // handle field.something fields, like date.start & date.end
    // result will be `field3: { start: '01/02/2003', end: '04/05/2006' }` for example
    for (let i = 0; i < path.length - 1; i++) {
      target[path[i]] ??= {}
      target = target[path[i]]
    }
    target[path[path.length - 1]] = value

    return acc
  }, {})
