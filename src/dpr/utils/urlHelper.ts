import querystring from 'querystring'
import Dict = NodeJS.Dict
import { ReportQuery } from '../types/class'
import { FilteredListRequest } from '../types'

const toRecord = (listRequest: FilteredListRequest): Record<string, string> => {
  return {
    selectedPage: listRequest.selectedPage.toString(),
    pageSize: listRequest.pageSize.toString(),
    sortColumn: listRequest.sortColumn,
    sortedAsc: listRequest.sortedAsc.toString(),
    ...listRequest.filters,
  }
}

const createUrlForParameters = (
  currentQueryParams: ReportQuery,
  updateQueryParams: Dict<string>,
) => {
  let queryParams: Dict<string> = currentQueryParams.toRecordWithFilterPrefix()

  if (updateQueryParams) {
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
    queryParams = toRecord({
      ...currentQueryParams,
      filters: null,
      selectedPage: 1,
    })
  }

  const nonEmptyQueryParams = {}

  Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .forEach((key) => {
      nonEmptyQueryParams[key] = queryParams[key]
    })

  return `?${querystring.stringify(nonEmptyQueryParams)}`
}

export default {
  createUrlForParameters,

  getCreateUrlForParametersFunction: (currentQueryParams: ReportQuery) => {
    return (updateQueryParams: Dict<string>) =>
      createUrlForParameters(currentQueryParams, updateQueryParams)
  },
}
