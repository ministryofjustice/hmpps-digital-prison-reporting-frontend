const createUrlForParameters = (currentQueryParams: NodeJS.Dict<string>, updateQueryParams: NodeJS.Dict<string>) => {
  let queryParams: NodeJS.Dict<string>

  if (updateQueryParams) {
    queryParams = {
      ...currentQueryParams
    }

    Object.keys(updateQueryParams).forEach((q) => {
      if (updateQueryParams[q]) {
        queryParams[q] = updateQueryParams[q]
      } else {
        Object.keys(queryParams)
          .filter((key) => key === q || key.startsWith(`${q}.`))
          .forEach((key) => {
            queryParams[key] = null
          })
      }
    })
  } else {
    queryParams = {
      selectedPage: '1',
      pageSize: currentQueryParams['pageSize'],
      sortColumn: currentQueryParams['sortColumn'],
      sortedAsc: currentQueryParams['sortedAsc'],
    }
  }

  const nonEmptyQueryParams: NodeJS.Dict<string> = {}

  Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .forEach((key) => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  const querystring = Object.keys(nonEmptyQueryParams).map(key => `${encodeURI(key)}=${encodeURI(nonEmptyQueryParams[key])}`).join('&')

   return `?${querystring}`
}

export default createUrlForParameters
