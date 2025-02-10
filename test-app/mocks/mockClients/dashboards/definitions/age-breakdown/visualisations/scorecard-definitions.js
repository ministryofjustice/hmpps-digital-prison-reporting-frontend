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
        id: 'total_prisoners',
        display: 'Total prisoners in wing',
      },
    ],
    ignore: [], // Empty ignore array flags that all other columns should be null
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
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
    ignore: [], // Empty ignore array flags that all other columns should be null
  },
}

const mockScorecardDefinitionEthnicWhite = {
  type: 'scorecard',
  columns: {
    measures: [
      {
        id: 'total_prisoners',
        display: 'Total prisoners whose ethnic description is White: Eng./Welsh/Scot./N.Irish/British',
      },
    ],
    values: [
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
        id: 'total_prisoners',
        display: 'Total prisoners whose ethnic description is Asian/Asian British: Pakistani',
      },
    ],
    values: [
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
        id: 'total_prisoners',
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
