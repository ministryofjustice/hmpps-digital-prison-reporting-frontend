export const clearFilterValue = '~clear~'

const createUrlForParameters = (
  currentQueryParams: NodeJS.Dict<string>,
  updateQueryParams: NodeJS.Dict<string>,
  columns: Array<string> = [],
) => {
  let queryParams: NodeJS.Dict<string>

  if (updateQueryParams) {
    queryParams = {
      ...currentQueryParams,
    }

    Object.keys(updateQueryParams).forEach((q) => {
      if (updateQueryParams[q]) {
        queryParams[q] = updateQueryParams[q]
      } else {
        Object.keys(queryParams)
          .filter((key) => key === q || key.startsWith(`${q}.`))
          .forEach((key) => {
            queryParams[key] = clearFilterValue
          })
      }
    })

    if (columns.length) {
      columns.forEach((col) => {
        queryParams[`columns.${col}`] = col
      })
    }
  } else {
    queryParams = {
      selectedPage: '1',
      pageSize: currentQueryParams.pageSize,
      sortColumn: currentQueryParams.sortColumn,
      sortedAsc: currentQueryParams.sortedAsc,
      dataProductDefinitionsPath: currentQueryParams.dataProductDefinitionsPath,
    }
  }

  const nonEmptyQueryParams: NodeJS.Dict<string> = {}

  Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .forEach((key) => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  return createQuerystringFromObject(nonEmptyQueryParams)
}

export const createQuerystringFromObject = (source: object) => {
  const querystring = Object.keys(source)
    .map((key) => {
      let k = key
      // eslint-disable-next-line prefer-destructuring
      if (key.includes('columns.')) k = key.split('.')[0]
      return `${encodeURI(k)}=${encodeURI(source[key as keyof typeof source])}`
    })
    .join('&')

  return `?${querystring}`
}

export default createUrlForParameters
