const current = [
  {
    establishment_id: 'MDI',
    has_ethnicity: 845,
  },
  {
    establishment_id: 'LTI',
    has_ethnicity: 1221,
  },
]

/**
 * TIMESERIES DATA
 *
 * Query:
 * - period: last two months
 * - end: 2025-01-31
 * - start: 2024-12-01
 * - granularity: months
 *
 * Data:
 * - timeseries[0][0] = data for 2024-11 -> 2024-12
 * - timeseries[0][1] = data for 2024-12 -> 2025-1
 * - currentValue = timeseries[x][2]
 */

const timeseries = [
  [
    {
      timestamp: '2024-11',
      establishment_id: 'MDI',
      has_ethnicity: 845,
    },
    {
      timestamp: '2024-11',
      establishment_id: 'LTI',
      has_ethnicity: 1221,
    },
  ],
  [
    {
      timestamp: '2024-12',
      establishment_id: 'MDI',
      has_ethnicity: 845,
    },
    {
      timestamp: '2024-12',
      establishment_id: 'LTI',
      has_ethnicity: 1221,
    },
  ],
]

/**
 * TIMESERIES WITH RAG
 *
 * Query:
 * - period: last three months
 * - end: 2025-01-20
 * - start: 2024-11-20
 * - granularity: months
 *
 * data:
 * - timeseries[x][0] = data for 2024-11
 * - timeseries[x][2] = data for 2025-1
 * - currentValue = timeseries[x][2]
 */

const timeseriesWithRag = [
  [
    {
      timestamp: 'sdfsdfsdf',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 845,
        rag: 0,
      },
    },
    {
      timestamp: 'sdfsdfsdf',
      establishment_id: {
        raw: 'LTI',
      },
      has_ethnicity: {
        raw: 1221,
        rag: 0,
      },
    },
  ],
  [
    {
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 845,
        rag: 0,
      },
    },
    {
      establishment_id: {
        raw: 'LTI',
      },
      count: 1221,
      has_ethnicity: 1221,
    },
  ],
  [
    {
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 845,
        rag: 0,
      },
    },
    {
      establishment_id: {
        raw: 'LTI',
      },
      count: 1221,
      has_ethnicity: 1221,
    },
  ],
]
