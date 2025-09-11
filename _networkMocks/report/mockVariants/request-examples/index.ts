import { requestExampleRequestError } from './error'
import { requestExampleExpire } from './expire'
import { requestExampleExpiredBookmark } from './expired-bookmark'
import { requestExampleFailCode } from './fail-code'
import { requestExampleFailStatus } from './fail-status'
import { requestExampleSuccess } from './success'

export const requestExampleVariants = [requestExampleRequestError, requestExampleExpire, requestExampleExpiredBookmark, requestExampleFailCode, requestExampleFailStatus, requestExampleSuccess]
