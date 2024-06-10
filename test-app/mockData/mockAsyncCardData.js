const mockCardData = [
  {
    id: 'test-1',
    href: './async-reports/test-1/request',
    text: 'Test 1',
    description: 'test 1 description',
    timestamp: 'Requested at: 24/05/2024, 13:58:14',
    tag: 'MIS',
    status: 'requested',
  },
  {
    id: 'test-2',
    href: './async-reports/test-2/request',
    text: 'Test 2',
    description: 'test 2 description',
    timestamp: 'Failed at: 24/05/2024, 13:58:14',
    tag: 'MIS',
    status: 'failed',
  },
  {
    id: 'test-3',
    href: './async-reports/test-3/request',
    text: 'Test 3',
    description: 'test 3 description',
    timestamp: 'Ready at: 24/05/2024, 13:58:14',
    tag: 'MIS',
    status: 'ready',
  },
  {
    id: 'test-4',
    href: './async-reports/test-4/request',
    text: 'Test 4',
    description: 'test 4 description',
    timestamp: 'Expired at: 24/05/2024, 13:58:14',
    tag: 'MIS',
    status: 'expired',
  },
  {
    id: 'test-5',
    href: './async-reports/test-5/request',
    text: 'Test 5',
    description: 'test 5 description',
    timestamp: 'Requested at: 24/05/2024, 13:58:14',
    tag: 'MIS',
    status: 'requested',
    filters: [
      { name: 'filter1', value: '1' },
      { name: 'filter2', value: '2' },
      { name: 'filter3', value: '3' },
    ],
    sort: [
      { name: 'Sorted by', value: 'filter1' },
      { name: 'Direction', value: 'ASC' },
    ],
  },
]

module.exports = mockCardData
