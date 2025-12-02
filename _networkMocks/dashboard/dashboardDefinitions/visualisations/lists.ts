import { components } from '../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

const explicitKeys = {
  id: 'explicit-keys',
  type: 'list',
  display: 'Explicit keys',
  description: 'Filter dataset where ALL keys have values present. Otherwise no rows are returned',
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
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const optionalKey = {
  id: 'optional-key',
  type: 'list',
  display: 'Optional key',
  description: 'Filtering cascades to return rows with with values for mandatory keys. Otherwise no rows are returned',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const allOptional = {
  id: 'all-optional',
  type: 'list',
  display: 'All keys are optional',
  description: 'Filtering cascades to return rows where all key values are null',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
        optional: true,
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotals = {
  id: 'diet-totals',
  type: 'list',
  display: 'Diet totals',
  description: '',
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsWithFilters = {
  id: 'diet-totals-with-filters',
  type: 'list',
  display: 'Diet totals filter on vegetarian',
  description: '',
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsWithFiltersSingleColumn = {
  id: 'diet-totals-single-column',
  type: 'list',
  display: 'Diet totals single column',
  description: '',
  columns: {
    keys: [
      {
        id: 'diet',
        display: 'Diet',
      },
    ],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
      {
        id: 'diet',
        equals: 'Pescatarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishment = {
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOptional = {
  id: 'diet-totals-by-establishment-optional',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWing = {
  id: 'diet-totals-by-establishment-by-wing',
  type: 'list',
  display: 'Diet totals by establishment, by wing',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingByCell = {
  id: 'diet-totals-by-establishment-by-wing-by-cell',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellFilters = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-filters',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'cell',
        display: 'Cell-1',
      },
      {
        id: 'cell',
        display: 'Cell-2',
      },
      {
        id: 'diet',
        display: 'Vegetarian',
      },
      {
        id: 'diet',
        display: 'Omnivore',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingOptional = {
  id: 'diet-totals-by-establishment-by-wing-optional',
  type: 'list',
  display: 'Diet totals by establishment, by wing',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
      {
        id: 'wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsOverTime = {
  id: 'diet-totals-over-time',
  type: 'list',
  display: 'Prisoner totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOverTime = {
  id: 'diet-totals-by-est-over-time',
  type: 'list',
  display: 'Prsioner totals by establishment over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOverTime = {
  id: 'diet-totals-by-est-by-wing-over-time',
  type: 'list',
  display: 'Prisoner totals by establishment, by wing, over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOverTimeOptional = {
  id: 'diet-totals-by-est-by-wing-over-time-optional',
  type: 'list',
  display: 'Diet totals by Establishment, by wing, over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
      {
        id: 'wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVegetarianOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
  display: 'Vegetarian totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVegetarianOvertimeByEst = {
  id: 'diet-totals-vegetarian-overtime-by-est',
  type: 'list',
  display: 'Vegetarian totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVegetarianOvertimeByEstByWing = {
  id: 'diet-totals-vegetarian-overtime-by-est-by-wing',
  type: 'list',
  display: 'Vegetarian totals over time by wing',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVegetarianOvertimeByEstByWingOptional = {
  id: 'diet-totals-vegetarian-overtime-by-est-by-wing-optional',
  type: 'list',
  display: 'Vegetarian totals over time by wing - Optional',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        optional: true,
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsVeganOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
  display: 'Vegan totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Vegan',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsAllDietOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsAllDietOvertimeByEst = {
  id: 'diet-totals-all-diet-overtime-by-est',
  type: 'list',
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const fullDataset: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'allData',
  type: DashboardVisualisationType.LIST,
  display: 'All Data in dataset',
  options: {
    showLatest: false,
  },
  columns: {
    measures: [],
    expectNulls: false,
  },
}

const fullDatasetOverTime = {
  id: 'allData',
  type: 'list',
  display: 'All Data in dataset',
  columns: {},
  options: { showLatest: false },
}

const dataQualityEthnicity = {
  id: 'list-data-quality-has-ethnicity',
  type: 'list',
  display: 'Ethnicity Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No Ethnicity',
      },
    ],
  },
}

const dataQualityColsToList = {
  id: 'list-data-quality-has-ethnicity',
  type: 'list',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No ethnicity',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'No religion',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
      },
    ],
  },
  options: { columnsAsList: true },
}

const dataQualityReligion = {
  id: 'list-data-quality-has-religion',
  type: 'list',
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'No religion',
      },
    ],
  },
}

const dataQualityNationality = {
  id: 'list-data-quality-has-nationality',
  type: 'list',
  display: 'nationality Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
      },
    ],
  },
}

const dataQualityEthnicityHistoric = {
  id: 'list-data-quality-has-ethnicity-historic',
  type: 'list',
  display: 'Ethnicity Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No Ethnicity',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityReligionHistoric = {
  id: 'list-data-quality-has-religion-historic',
  type: 'list',
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'No religion',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityNationalityHistoric = {
  id: 'list-data-quality-has-nationality-historic',
  type: 'list',
  display: 'Nationality Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
      },
    ],
  },
  options: { showLatest: false },
}

const lists = {
  explicitKeys,
  optionalKey,
  allOptional,
  dietTotals,
  dietTotalsWithFilters,
  dietTotalsWithFiltersSingleColumn,
  dietTotalsByEstablishment,
  dietTotalsByEstablishmentByWing,
  dietTotalsByEstablishmentByWingByCell,
  dietTotalsByEstablishmentByWingOptional,
  dietTotalsByEstablishmentOptional,
  dietTotalsOverTime,
  dietTotalsByEstablishmentOverTime,
  dietTotalsByEstablishmentByWingOverTime,
  dietTotalsByEstablishmentByWingByCellFilters,
  dietTotalsByEstablishmentByWingOverTimeOptional,
  dietTotalsVegetarianOvertime,
  dietTotalsVeganOvertime,
  dietTotalsAllDietOvertime,
  dietTotalsAllDietOvertimeByEst,
  dietTotalsVegetarianOvertimeByEst,
  dietTotalsVegetarianOvertimeByEstByWing,
  dietTotalsVegetarianOvertimeByEstByWingOptional,
  fullDataset,
  fullDatasetOverTime,
  dataQualityEthnicity,
  dataQualityReligion,
  dataQualityNationality,
  dataQualityEthnicityHistoric,
  dataQualityReligionHistoric,
  dataQualityNationalityHistoric,
  dataQualityColsToList,
}

export default lists
