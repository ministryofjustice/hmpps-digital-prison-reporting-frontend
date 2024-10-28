const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
    {
      id: 'test-metric-id-2',
    },
  ],
}

const mockDashboardDefinition2 = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition3 = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition4 = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition5 = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition6 = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  loadType: 'async',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition7 = {
  id: 'test-dashboard-7',
  name: 'Test Dashboard 7',
  description: 'Synchronous loading',
  metrics: [
    {
      id: 'test-metric-id-1',
    },
  ],
}

const mockDashboardDefinition8 = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard 8',
  loadType: 'async',
  description: 'Async Dashboard Testing',
  metrics: [{ id: 'test-metric-id-1' }, { id: 'test-metric-id-2' }, { id: 'test-metric-id-3' }],
}

module.exports = [
  mockDashboardDefinition1,
  mockDashboardDefinition2,
  mockDashboardDefinition3,
  mockDashboardDefinition4,
  mockDashboardDefinition5,
  mockDashboardDefinition6,
  mockDashboardDefinition7,
  mockDashboardDefinition8,
]
