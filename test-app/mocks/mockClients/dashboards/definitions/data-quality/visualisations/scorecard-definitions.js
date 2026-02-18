// @ts-nocheck
const mockScorecardDefinitionMetricTwo = {
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  options: {
    buckets: [{ hexColour: '#f47738' }, { hexColour: '#f499be' }, { hexColour: '#d53880' }],
  },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
      },
    ],
  },
}

const mockScorecardDefinitionNoMetricTwo = {
  type: 'scorecard',
  display: 'No of prisoners with no MetricTwo',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'metric_two_is_missing',
      },
    ],
  },
}

const mockScorecardDefinitionReligion = {
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
      },
    ],
  },
}

const mockTargetScorecardDefinitionReligion = {
  type: 'scorecard',
  display: 'No of prisoners with religion in SLI',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'GHI',
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
        display: 'With religion in Establishment: ',
      },
      {
        id: 'has_metric_three',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupMetricTwoByEstablishment = {
  id: 'MetricTwo-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has MetricTwo by Establishment',
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
        display: 'With MetricTwo in establishment: ',
      },
      {
        id: 'has_metric_two',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupMetricOneByEstablishment = {
  id: 'MetricOne-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has MetricOne by Establishment',
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
        display: 'With MetricOne in establishment: ',
      },
      {
        id: 'has_metric_one',
        displayValue: true,
      },
    ],
  },
}

module.exports = {
  mockScorecardDefinitionMetricTwo,
  mockScorecardDefinitionNoMetricTwo,
  mockScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
  mockScorecardGroupMetricTwoByEstablishment,
  mockScorecardGroupMetricOneByEstablishment,
  mockTargetScorecardDefinitionReligion,
}
