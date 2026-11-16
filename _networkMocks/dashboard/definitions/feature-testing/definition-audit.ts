import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const badChartMetaAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bad-chart-meta-audit-0',
  type: DashboardVisualisationType.BAR,
  display: '',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: '',
        display: '',
      },
      {
        id: '',
        display: '',
      },
    ],
    expectNulls: false,
  },
}

const badChartMetaAudit1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bad-chart-meta-audit-1',
  type: DashboardVisualisationType.BAR,
  display: 'Bad chart meta audit 1',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: '',
        display: '',
      },
      {
        id: '',
        display: '',
      },
    ],
    expectNulls: false,
  },
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing',
  name: 'Dashboard Audit testing',
  description: 'Test Dashboard used for audit testing',
  sections: [
    // Bad section - missing all meta and visuals
    {
      id: 'section-0',
      display: '',
      description: '',
      visualisations: [],
    },
    // Bad section - missing some meta and visuals
    {
      id: 'section-1',
      display: 'Bad section meta',
      description: '',
      visualisations: [],
    },
    // Bad visualisation meta
    {
      id: 'section-2',
      display: 'Bad visualisation meta',
      description: 'Audit examples that show visualisations with incomplete meta data',
      visualisations: [badChartMetaAudit0, badChartMetaAudit1],
    },
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Bar charts that need work',
      visualisations: [],
    },
    {
      id: 'section-3',
      display: 'Doughnut charts',
      description: 'Doughnut charts that need work',
      visualisations: [],
    },
    {
      id: 'section-4',
      display: 'Line charts',
      description: 'Line charts that need work',
      visualisations: [],
    },
  ],
  filterFields: [],
}
