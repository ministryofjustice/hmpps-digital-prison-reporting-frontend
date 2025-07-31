const mockScoreCards = [
  {
    title: 'Establishment ID: MDI',
    scorecards: [
      {
        title: 'Has ethnicity',
        value: 602,
        rag: { score: 2, color: 'red' },
        valueFor: 'Jul 25',
        trend: { direction: 1, value: 34, from: 'Feb 25' },
      },
      {
        title: 'Ethnicity is missing',
        value: 443,
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 133, from: 'Feb 25' },
      },
      { title: 'Has nationality', value: 448, valueFor: 'Jul 25', trend: { direction: 1, value: 17, from: 'Feb 25' } },
      {
        title: 'Nationality is missing',
        value: 470,
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 174, from: 'Feb 25' },
      },
      {
        title: 'Has religion',
        value: 645,
        rag: { score: 2, color: 'red' },
        valueFor: 'Jul 25',
        trend: { direction: 1, value: 139, from: 'Feb 25' },
      },
      {
        title: 'Religion is missing',
        value: 526,
        rag: { score: 1, color: 'yellow' },
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 219, from: 'Feb 25' },
      },
    ],
  },
  {
    title: 'Establishment ID: KMI',
    scorecards: [
      {
        title: 'Has ethnicity',
        value: 602,
        rag: { score: 2, color: 'red' },
        valueFor: 'Jul 25',
        trend: { direction: 1, value: 34, from: 'Feb 25' },
      },
      {
        title: 'Ethnicity is missing',
        value: 443,
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 133, from: 'Feb 25' },
      },
      { title: 'Has nationality', value: 448, valueFor: 'Jul 25', trend: { direction: 1, value: 17, from: 'Feb 25' } },
      {
        title: 'Nationality is missing',
        value: 470,
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 174, from: 'Feb 25' },
      },
      {
        title: 'Has religion',
        value: 645,
        rag: { score: 2, color: 'red' },
        valueFor: 'Jul 25',
        trend: { direction: 1, value: 139, from: 'Feb 25' },
      },
      {
        title: 'Religion is missing',
        value: 526,
        rag: { score: 1, color: 'yellow' },
        valueFor: 'Jul 25',
        trend: { direction: -1, value: 219, from: 'Feb 25' },
      },
    ],
  },
]

module.exports = mockScoreCards
