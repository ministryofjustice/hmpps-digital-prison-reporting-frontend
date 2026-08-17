import { components } from 'src/dpr/types/api'
import * as BarCharts from '../visualisations/complete-dataset/bar/vis-definitions/cols-as-labels'
import * as DoughnutCharts from '../visualisations/complete-dataset/doughnut/vis-definitions/definitions'
import * as LineCharts from '../visualisations/complete-dataset/line/vis-definitions/cols-as-labels'

export const childDashboardOneDefinition = {
  id: 'test-child-dashboard-1',
  name: 'Child one dashboard',
  description: 'Dashboard used for mocking child 1 dashboard',
  sections: [
    {
      id: 'child-one-section-1',
      display: 'Child one - Section 1',
      description: 'Child one - Section 1 description',
      visualisations: [
        {
          ...LineCharts.dataQualityMetricOneLine,
          description: 'Child 1 line chart',
        },
      ],
    },
    {
      id: 'child-one-section-2',
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [
        {
          ...LineCharts.dataQualityMetricTwoLine,
          description: 'Child 1 line chart 2',
        },
      ],
    },
    {
      id: 'parent-section-1', // should merge to parent-section-1 in the parent dashboard
      display: 'Child one - Section 3',
      description: 'Child one - Section 3 - description',
      visualisations: [
        {
          ...LineCharts.dataQualityMetricThreeLine,
          description: 'Child 1 line chart 3',
        },
      ],
    },
  ],
}

export const childDashboardTwoDefinition = {
  id: 'test-child-dashboard-2',
  name: 'Child two dashboard',
  description: 'Dashboard used for mocking child 2 dashboard',
  sections: [
    {
      id: 'child-two-section-1',
      display: 'Child two - Section 1',
      description: 'Child two - Section 1 description',
      visualisations: [
        {
          ...DoughnutCharts.dataQualityMetricOneDoughnut,
          description: 'Child 2 dounut chart 1',
        },
      ],
    },
    {
      id: 'child-two-section-2',
      display: 'Child two - Section 2',
      description: 'Child two - Section 2 description',
      visualisations: [
        {
          ...DoughnutCharts.dataQualityMetricTwoDoughnut,
          description: 'Child 2 dounut chart 2',
        },
      ],
    },
    {
      id: 'parent-section-2', // should merge to parent-section-2 in the parent dashboard
      display: 'Child two - Section 3',
      description: 'Child two - Section 3 - description',
      visualisations: [
        {
          ...DoughnutCharts.dataQualityMetricThreeDoughnut,
          description: 'Child 2 dounut chart 3',
        },
      ],
    },
  ],
}

// Parent dashboard with child variants
export const parentChildDashboardDefinition: components['schemas']['DashboardDefinition'] = {
  id: 'test-parent-dashboard',
  name: 'Test Parent Dashboard',
  description: 'Dashboard used for mocking parent-child dashboards',
  childVariants: [childDashboardOneDefinition, childDashboardTwoDefinition],
  sections: [
    {
      id: 'parent-section-1',
      display: 'Parent - Section 1',
      description: 'Parent Section 1 description',
      visualisations: [
        {
          ...BarCharts.dataQualityMetricOneBar,
          description: 'parent bar chart 1',
        },
      ],
    },
    {
      id: 'parent-section-2',
      display: 'Parent - Section 2',
      description: 'Parent Section 2 description',
      visualisations: [
        {
          ...BarCharts.dataQualityMetricTwoBar,
          description: 'parent bar chart 2',
        },
      ],
    },
  ],
}
