import ErrorSummaryUtils from './utils'

describe('ErrorSummaryUtils', () => {
  describe('mapError', () => {
    it('should map the error to the correct message', () => {
      const message = ErrorSummaryUtils.mapError('TypeError: yadda yadda yadda')

      expect(message).toEqual('There is an issue in the client. This has been reported to admin staff')
    })

    it('should not map the error to the correct message', () => {
      const message = ErrorSummaryUtils.mapError('OtherError: yadda yadda yadda')

      expect(message).toEqual('OtherError: yadda yadda yadda')
    })
  })
})
