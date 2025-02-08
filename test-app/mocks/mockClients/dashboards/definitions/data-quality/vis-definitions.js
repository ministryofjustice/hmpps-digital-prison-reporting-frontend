const mockEthnicityBarChart = {
  id: 'mockEthnicityBarChart',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart',
  description: 'Prisoner totals for missing ethnicity',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_ethnicity',
        display: 'Has Ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has No Ethnicity',
      },
    ],
    ignoreRemainingColumns: true,
  },
}

const mockEthnicityBarChartList = {
  id: 'mockEthnicityBarChartFromList',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart from list',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        axis: 'x',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
        axis: 'y',
      },
    ],
  },
}

const mockEthnicityLineChartTimeseries = {
  id: 'mockEthnicityLineChartTimeseries',
  type: 'line',
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'timestamp',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
  },
}

const mockEthnicityPieChart = {
  ...mockEthnicityBarChart,
  id: 'mockEthnicityPieChart',
  type: 'doughnut',
  display: 'Missing Ethnicity Pie Chart',
}

const mockNationalityBarChart = {
  id: 'mockNationalityBarChart',
  type: 'bar',
  display: 'Missing Nationality Bar Chart',
  description: 'Prisoner totals for missing nationality',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'Has No nationality',
      },
    ],
    ignoreRemainingColumns: true,
  },
}

const mockReligionPieChart = {
  ...mockNationalityBarChart,
  id: 'mockReligionPieChart',
  type: 'doughnut',
  display: 'Missing Nationality Pie Chart',
}

const mockReligionBarChart = {
  id: 'mockReligionBarChart',
  type: 'bar',
  display: 'Missing Religion Bar Chart',
  description: 'Prisoner totals for missing religion',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'Has no religion',
      },
    ],
    ignoreRemainingColumns: true,
  },
}

const mockNationalityPieChart = {
  ...mockNationalityBarChart,
  id: 'mockNationalityPieChart',
  type: 'doughnut',
  display: 'Missing Religion Pie Chart',
}

const mockScorecardDefinitionNationality = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_nationality',
        display: 'No of prisoners with nationality',
      },
    ],
  },
}

const mockScorecardDefinitionNoNationality = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'nationality_is_missing',
        display: 'No of prisoners with no nationality',
      },
    ],
  },
}

const mockScorecardDefinitionReligion = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_religion',
        display: 'No of prisoners with nationality',
      },
    ],
  },
}

const mockTargetScorecardDefinitionReligion = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_religion',
        display: 'No of prisoners with religion in SLI',
      },
    ],
    values: [
      {
        id: 'establishment_id',
        equals: 'SLI',
      },
    ],
  },
}

const mockScorecardGroupReligionByEstablishment = {
  id: 'religion-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has religion by Establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With Religion in Establishment: ',
      },
      {
        id: 'has_religion',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupNationalityByEstablishment = {
  id: 'nationality-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has nationality by Establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With Nationality in establishment: ',
      },
      {
        id: 'has_nationality',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupEthnicityByEstablishment = {
  id: 'ethnicity-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has ethnicity by Establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With Ethnicity in establishment: ',
      },
      {
        id: 'has_ethnicity',
        displayValue: true,
      },
    ],
  },
}

module.exports = {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
  mockScorecardDefinitionNationality,
  mockScorecardDefinitionNoNationality,
  mockScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
  mockScorecardGroupNationalityByEstablishment,
  mockScorecardGroupEthnicityByEstablishment,
  mockTargetScorecardDefinitionReligion,
  mockEthnicityBarChartList,
  mockEthnicityLineChartTimeseries,
}
