const mockDashboardEmpty = {
  id: 'test-dashboard-10',
  name: 'Test Dashboard 10',
  description: 'Scorecards',
  layout: [],
  lists: [],
  metrics: [],
  scorecards: [],
}


const mockDashboardLayoutDefinition = {
  id: 'test-dashboard-10',
  name: 'Test Dashboard 10',
  description: 'Scorecards',
  layout: [
    {
      type: 'metric',
      id: 'metric-1',
    },
    {
      type: 'scorecard',
      id: 'test-scorecards',
    },
    {
      type: 'metric',
      id: 'metric-2',
    },
    {
      type: 'list',
      id: 'test-list',
    },
  ],
  lists: [
    {
      id: 'test-list',
      ...
    },
  ],
  metrics: [
    {
      id: 'metric-1',
      ...
    },
    {
      id: 'metric-2',
      ...
    },
  ],
  scorecards: [
    {
      id: 'test-scorecards',
      ...
    },
  ],
}
