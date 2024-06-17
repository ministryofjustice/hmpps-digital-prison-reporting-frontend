export const clearFilterValue = '~clear~'

const createUrlForParameters = (
  currentQueryParams: NodeJS.Dict<string | Array<string>>,
  updateQueryParams: NodeJS.Dict<string>,
) => {
  let queryParams: NodeJS.Dict<string | Array<string>>

  if (updateQueryParams) {
    queryParams = {
      ...currentQueryParams,
      selectedPage: '1',
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
  } else {
    queryParams = {
      selectedPage: '1',
      pageSize: currentQueryParams.pageSize,
      sortColumn: currentQueryParams.sortColumn,
      sortedAsc: currentQueryParams.sortedAsc,
      dataProductDefinitionsPath: currentQueryParams.dataProductDefinitionsPath,
    }
  }

  const nonEmptyQueryParams: NodeJS.Dict<string | Array<string>> = {}

  Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .forEach((key) => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  return createQuerystringFromObject(nonEmptyQueryParams)
}

export const createQuerystringFromObject = (source: object) => {
  const querystring = Object.keys(source)
    .map((key) => `${encodeURI(key)}=${encodeURI(source[key as keyof typeof source])}`)
    .join('&')

  return `?${querystring}`
}

export const getDpdPathSuffix = (dpdsPath: string) => {
  if (dpdsPath && dpdsPath !== '') {
    return `?dataProductDefinitionsPath=${dpdsPath}`
  }

  return ''
}

export default createUrlForParameters
