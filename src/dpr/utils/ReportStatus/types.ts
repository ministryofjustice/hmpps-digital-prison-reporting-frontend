export enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  STARTED = 'STARTED',
  PICKED = 'PICKED',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
  READY = 'READY',
  ALL = 'ALL',
}

export type FailureInfo = {
  userMessage: string
  developerMessage?: string
  errorCode?: number
}

export type UpstreamSignal =
  | { kind: 'STATUS'; status: RequestStatus }
  | { kind: 'ERROR'; failure: FailureInfo }
  | { kind: 'EMPTY' }

export type StatusResolution =
  | { type: 'NO_CHANGE' }
  | {
      type: 'UPDATE'
      newStatus: RequestStatus
      failureInfo?: FailureInfo
    }
