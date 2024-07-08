import { Url } from 'url'
import { Page, PageSize, Pagination } from './types'

const SELECTED_PAGE_PARAM = 'selectedPage'
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

/**
 * Creates the pages for the pagination component
 *
 * @param {string} pathname
 * @param {string} search
 * @param {number} totalRows
 * @param pageSize
 * @param currentPage
 * @return {*}  {{ pages: page[]; pagesLength: number }}
 */
const createPages = (
  pathname: string,
  search: string,
  totalRows: number,
  pageSize: number,
  currentPage: number
): { pages: Page[]; pagesLength: number } => {
  const queryParams = new URLSearchParams(search)
  const pagesLength = Math.ceil(totalRows / pageSize)

  const pages: Page[] = []
  Array(pagesLength)
    .fill(0)
    .forEach((_, index: number) => {
      const pageNumber = index + 1
      queryParams.set(SELECTED_PAGE_PARAM, `${pageNumber}`)

      if (
        pageNumber === 1 ||
        pageNumber === pagesLength ||
        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
      ) {
        pages.push({
          number: pageNumber,
          href: `${pathname}?${queryParams.toString()}`,
          current: pageNumber === currentPage,
        })
      } else if (pageNumber === 2 || pageNumber === pagesLength - 1) {
        pages.push({ ellipsis: true })
      }
    })

  return {
    pages,
    pagesLength,
  }
}

/**
 * Creates the next link
 *
 * @param {string} pathname
 * @param {string} search
 * @param {number} lastPage
 * @param totalRows
 * @param currentPage
 * @return {*}  {(string | undefined)}
 */
const createNext = (
  pathname: string,
  search: string,
  lastPage: number,
  totalRows: number,
  currentPage: number
): string | undefined => {
  const queryParams = new URLSearchParams(search)

  if (totalRows > 0) {
    let nextPage = 2
    if (queryParams.has(SELECTED_PAGE_PARAM)) {
      currentPage = +queryParams.get(SELECTED_PAGE_PARAM)
      if (currentPage === lastPage) {
        return undefined
      }
      nextPage = currentPage + 1
    }

    queryParams.set(SELECTED_PAGE_PARAM, `${nextPage}`)

    return `${pathname}?${queryParams.toString()}`
  }
  return undefined
}

/**
 * Creates the previous link
 *
 * @param {string} pathname
 * @param {string} search
 * @param currentPage
 * @return {*}  {(string | undefined)}
 */
const createPrev = (
  pathname: string,
  search: string,
  currentPage: number
): string | undefined => {
  const queryParams = new URLSearchParams(search)

  let prevPage = 0
  if (queryParams.has(SELECTED_PAGE_PARAM)) {
    currentPage = +queryParams.get(SELECTED_PAGE_PARAM)
    if (currentPage === 1) {
      return undefined
    }
    prevPage = currentPage - 1
    queryParams.set(SELECTED_PAGE_PARAM, `${prevPage}`)
    return `${pathname}?${queryParams.toString()}`
  }
  return undefined
}

/**
 * Set the select items for the page size component
 *
 * @param {number} totalRows
 * @return {*}
 */
const setPageSizes = (totalRows: number): PageSize[] => {
  const pageSizes = [10, 20, 100, 200, totalRows]
  return pageSizes.map((size, i) => {
    if (i === pageSizes.length - 1) {
      return { value: totalRows, text: 'All' }
    }
    return { value: size, text: size.toString() }
  })
}

/**
 * Init pagination
 *
 * @return {*}
 */
export default {
  getPaginationData: (
    url: Url,
    totalRows: number,
    pageSize: number = DEFAULT_PAGE_SIZE,
    currentPage: number = DEFAULT_PAGE
  ): Pagination => {
    const { pathname, search } = url
    const { pages, pagesLength } = createPages(pathname, search, totalRows, pageSize, currentPage)
    return {
      next: createNext(pathname, search, pagesLength, totalRows, currentPage),
      prev: createPrev(pathname, search, currentPage),
      pages,
      pageSize,
      currentPage,
      totalRows,
      sizes: setPageSizes(totalRows),
    }
  },
}
