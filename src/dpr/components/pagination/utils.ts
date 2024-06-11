import { Url } from 'url'
import { Page } from './types'

const SELECTED_PAGE_PARAM = 'selectedPage'
const PAGE_SIZE_PARAM = 'pageSize'
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

let pageSize = DEFAULT_PAGE_SIZE
let currentPage = DEFAULT_PAGE

/**
 * Creates the pages for the pagination component
 *
 * @param {string} pathname
 * @param {string} search
 * @param {number} totalRows
 * @return {*}  {{ pages: page[]; pagesLength: number }}
 */
const createPages = (pathname: string, search: string, totalRows: number): { pages: Page[]; pagesLength: number } => {
  const queryParams = new URLSearchParams(search)
  pageSize = +queryParams.get(PAGE_SIZE_PARAM) || DEFAULT_PAGE_SIZE
  currentPage = +queryParams.get(SELECTED_PAGE_PARAM) || DEFAULT_PAGE
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
 * Creates the the next link
 *
 * @param {string} pathname
 * @param {string} search
 * @param {number} lastPage
 * @return {*}  {(string | undefined)}
 */
const createNext = (pathname: string, search: string, lastPage: number): string | undefined => {
  const queryParams = new URLSearchParams(search)

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

/**
 * Creates the previous link
 *
 * @param {string} pathname
 * @param {string} search
 * @return {*}  {(string | undefined)}
 */
const createPrev = (pathname: string, search: string): string | undefined => {
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
const setPageSizes = (totalRows: number) => {
  const pageSizes = [10, 20, 100, 200, totalRows]
  return pageSizes.map((size, i) => {
    if (i === pageSizes.length - 1) {
      return { value: totalRows, text: 'All' }
    }
    return { value: size, text: size }
  })
}

/**
 * Init pagination
 *
 * @param {urlData} url
 * @return {*}
 */
export default {
  getPaginationData: (url: Url, totalRows: number) => {
    const { pathname, search } = url
    const { pages, pagesLength } = createPages(pathname, search, totalRows)
    return {
      next: createNext(pathname, search, pagesLength),
      prev: createPrev(pathname, search),
      pages,
      pageSize,
      currentPage,
      totalRows,
      sizes: setPageSizes(totalRows),
    }
  },
}
