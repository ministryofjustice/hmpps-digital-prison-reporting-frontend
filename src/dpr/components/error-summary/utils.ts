export default {
  handleError: (error: DprError | DprErrorData | Error, reportType?: string) => {
    const dprError: DprError = formatError(error)
    return mapError(dprError, reportType)
  },
}

const mapError = (error: DprError | DprErrorData | Error, reportType?: string): DprUIError => {
  const dprError: DprError = formatError(error)

  let status = 'FAILED'
  let message

  if (dprError.userMessage.includes('TypeError:')) {
    message = 'There is an issue in the client. This has been reported to admin staff'
  }

  if (dprError.userMessage.includes('TypeError:')) {
    status = 'EXPIRED'
    message = `This ${reportType} has expired`
  }

  return {
    status,
    developerMessage: dprError.developerMessage,
    userMessage: message || dprError.userMessage,
  }
}

const formatError = (error: DprError | DprErrorData | Error) => {
  if (error && (<DprErrorData>error).data) {
    return (<DprErrorData>error).data
  }

  if (error && (<Error>error).message) {
    const e: Error = error as Error
    return {
      status: 500,
      userMessage: `${e.name}: ${e.message}`,
      developerMessage: e.stack,
    }
  }

  return error as DprError
}

interface DprErrorData {
  data: DprError
}

interface DprError {
  status: number | string
  errorCode?: number
  userMessage: string
  developerMessage: string
  moreInfo?: string
}

interface DprUIError {
  status: string
  userMessage: string
  developerMessage: string
}
