import { components } from 'src/dpr/types/api'
import * as BarCharts from '../visualisations/complete-dataset/bar/vis-definitions/cols-as-labels'
import * as DoughnutCharts from '../visualisations/complete-dataset/doughnut/vis-definitions/definitions'
import * as LineCharts from '../visualisations/complete-dataset/line/vis-definitions/cols-as-labels'

const childDashboard1 = {
  id: 'test-child-dashboard-1',
  name: 'Child one dashboard',
  description: 'Dashboard used for mocking child 1 dashboard',
  sections: [
    {
      id: 'child-one-section-1',
      display: 'Child one - Section 1',
      description: 'Child one - Section 1 description',
      visualisations: [LineCharts.dataQualityMetricTwoLine],
    },
    {
      id: 'child-one-section-2',
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [LineCharts.dataQualityMetricThreeLine],
    },
    {
      id: 'parent-section-1', // should merge to parent-section-1 in the parent dashboard
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [LineCharts.dataQualityMetricOneMetricTwoLine],
    },
  ],
}

const childDashboard2 = {
  id: 'test-child-dashboard-2',
  name: 'Child two dashboard',
  description: 'Dashboard used for mocking child 2 dashboard',
  sections: [
    {
      id: 'child-two-section-1',
      display: 'Child two - Section 1',
      description: 'Child two - Section 1 description',
      visualisations: [DoughnutCharts.dataQualityMetricTwoDoughnut],
    },
    {
      id: 'child-two-section-2',
      display: 'Child two - Section 2',
      description: 'Child two - Section 2 description',
      visualisations: [DoughnutCharts.dataQualityMetricThreeDoughnut],
    },
    {
      id: 'parent-section-2', // should merge to parent-section-2 in the parent dashboard
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [DoughnutCharts.dataQualityMetricOneDoughnut],
    },
  ],
}

// Parent dashboard with child variants
export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'test-parent-dashboard',
  name: 'Test Parent Dashboard',
  description: 'Dashboard used for mocking parent-child dashboards',
  childVariants: [childDashboard1, childDashboard2],
  sections: [
    {
      id: 'parent-section-1',
      display: 'Parent - Section 1',
      description: 'Parent Section 1 description',
      visualisations: [BarCharts.dataQualityMetricOneBar],
    },
    {
      id: 'parent-section-2',
      display: 'Parent - Section 2',
      description: 'Parent Section 2 description',
      visualisations: [BarCharts.dataQualityMetricTwoBar],
    },
  ],
}
