import { expect } from '@jest/globals'
import ErrorSummaryUtils, { DprError, DprErrorData } from './utils'

describe('ErrorSummaryUtils', () => {
  describe('handleError', () => {
    let dprError: DprError
    let dprErrorData: DprErrorData
    let error: Error

    beforeEach(() => {
      dprError = {
        status: 404,
        errorCode: 404,
        userMessage: 'TypeError:',
        developerMessage: 'stack trace',
      }

      dprErrorData = {
        data: dprError,
      }

      error = {
        name: 'TypeError',
        message: 'error message',
        stack: 'stack',
      }
    })

    it('should handle a dpr error and map it to friendly message', () => {
      const mappedError = ErrorSummaryUtils.handleError(dprError)

      expect(mappedError.userMessage).toEqual('There is an issue in the client. This has been reported to admin staff')
    })

    it('should handle a dpr data error and map it to friendly message', () => {
      const mappedError = ErrorSummaryUtils.handleError(dprErrorData)

      expect(mappedError.userMessage).toEqual('There is an issue in the client. This has been reported to admin staff')
    })

    it('should handle a generic data and map it to friendly message', () => {
      const mappedError = ErrorSummaryUtils.handleError(error)

      expect(mappedError.userMessage).toEqual('There is an issue in the client. This has been reported to admin staff')
    })

    it('should handle a dpr error and map it to an expired message', () => {
      dprError.userMessage = 'The stored report or dashboard was not found.'
      const mappedError = ErrorSummaryUtils.handleError(dprError, 'report')

      expect(mappedError.userMessage).toEqual('This report has expired')
      expect(mappedError.status).toEqual('EXPIRED')
    })
  })
})
