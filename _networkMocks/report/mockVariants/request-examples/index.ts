import { requestExampleRequestError } from './error'
import { requestExampleExpire } from './expire'
import { requestExampleExpiredBookmark } from './expired-bookmark'
import { requestExampleFailCode } from './fail-code'
import { requestExampleFailStatus } from './fail-status'
import { requestExampleSuccess } from './success'
import { requestExampleExecutionDataError } from './execution-data-error'

export const requestExampleVariants = [
  requestExampleRequestError,
  requestExampleExpire,
  requestExampleExpiredBookmark,
  requestExampleFailCode,
  requestExampleFailStatus,
  requestExampleSuccess,
  requestExampleExecutionDataError,
]
