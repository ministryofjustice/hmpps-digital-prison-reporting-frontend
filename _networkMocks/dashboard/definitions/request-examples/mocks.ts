import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import {
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
} from './definitions'

const productId = 'request-examples'

export const successfulExecutionDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${successfulExecution.id}`,
  successfulExecution,
)

export const failedExecutionDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${failedExecution.id}`,
  failedExecution,
)

export const serverErrorDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${serverError.id}`,
  serverError,
)

export const expiredDashboardDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${expiredDashboard.id}`,
  expiredDashboard,
)

export const requestTimeoutDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${requestTimeout.id}`,
  requestTimeout,
)

export const failedRequestDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${failedRequest.id}`,
  failedRequest,
)

export const mocks = [
  successfulExecutionDashboardMock,
  failedExecutionDashboardMock,
  serverErrorDashboardMock,
  requestTimeoutDashboardMock,
  requestTimeoutDashboardMock,
  failedRequestDashboardMock,
]
