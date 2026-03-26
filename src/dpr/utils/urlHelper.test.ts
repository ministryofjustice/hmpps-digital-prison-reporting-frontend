import { expect, it, describe } from '@jest/globals'
import { setNestedPath } from './urlHelper'

describe('URL helper', () => {
  it('should set the path correctly when baseUrl is undefined', () => {
    const baseUrl = undefined
    const thing = 'thing'
    const url1 = setNestedPath('/dpr/test/part', baseUrl)
    const url2 = setNestedPath('/dpr/test/part/path', baseUrl)
    const url3 = setNestedPath(`/dpr/${thing}/test/path`, baseUrl)

    expect(url1).toEqual('/dpr/test/part')
    expect(url2).toEqual('/dpr/test/part/path')
    expect(url3).toEqual('/dpr/thing/test/path')
  })

  it('should set the path correctly when baseUrl is not undefined', () => {
    const baseUrl = '/some/nested/path'
    const thing = 'thing'
    const url1 = setNestedPath('/dpr/test/part', baseUrl)
    const url2 = setNestedPath('/dpr/test/part/path', baseUrl)
    const url3 = setNestedPath(`/dpr/${thing}/test/path`, baseUrl)

    expect(url1).toEqual('/some/nested/path/dpr/test/part')
    expect(url2).toEqual('/some/nested/path/dpr/test/part/path')
    expect(url3).toEqual('/some/nested/path/dpr/thing/test/path')
  })
})
