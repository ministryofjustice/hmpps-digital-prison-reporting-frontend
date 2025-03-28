const mockScorecardDefinitionTotalInWing = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners in wing',
      },
    ],
    expectNulls: true,
  },
}

const mockScorecardDefinitionTotalInEst = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const mockScorecardDefinitionEthnicWhite = {
  type: 'scorecard',
  columns: {
    measures: [
      {
        id: 'count',
        display: 'Total prisoners whose ethnic description is White: Eng./Welsh/Scot./N.Irish/British',
      },
    ],
    filters: [
      {
        id: 'ethnic_code',
        equals: 'W2',
      },
    ],
  },
}

const mockScorecardDefinitionEthnicAsian = {
  type: 'scorecard',
  columns: {
    measures: [
      {
        id: 'count',
        display: 'Total prisoners whose ethnic description is Asian/Asian British: Pakistani',
      },
    ],
    filters: [
      {
        id: 'ethnic_code',
        equals: 'A2',
      },
    ],
  },
}

const mockScoreCardGroupReligion = {
  type: 'scorecard-group',
  columns: {
    measures: [
      {
        id: 'religion_code',
      },
      {
        id: 'religion_description',
        display: 'Total prisoners whose religion description is',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
  },
}

module.exports = {
  mockScorecardDefinitionTotalInWing,
  mockScorecardDefinitionTotalInEst,
  mockScorecardDefinitionEthnicWhite,
  mockScorecardDefinitionEthnicAsian,
  mockScoreCardGroupReligion,
}
