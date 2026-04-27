import ErrorHandler from '../errors/ErrorHandler'
import { RequestStatus, UpstreamSignal } from './types'

export async function getReportUpstreamSignal(fetcher: () => Promise<unknown>): Promise<UpstreamSignal> {
  try {
    const response = await fetcher()

    if (!response || typeof response !== 'object') {
      return { kind: 'EMPTY' }
    }

    const raw = response as any

    if (typeof raw.status === 'string') {
      return {
        kind: 'STATUS',
        status: raw.status as RequestStatus,
      }
    }

    if (typeof raw.status === 'number') {
      const failure = new ErrorHandler({ data: raw }).formatError()
      return {
        kind: 'ERROR',
        failure,
      }
    }

    return { kind: 'EMPTY' }
  } catch (error) {
    // Transport / thrown error
    const failure = new ErrorHandler(error).formatError()
    return {
      kind: 'ERROR',
      failure,
    }
  }
}
