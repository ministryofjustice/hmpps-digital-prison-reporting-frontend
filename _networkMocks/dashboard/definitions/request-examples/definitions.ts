import { components } from 'src/dpr/types/api'

export const successfulExecution = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

export const failedExecution = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

export const serverError = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

export const expiredDashboard = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

export const requestTimeout = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

export const failedRequest = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}
