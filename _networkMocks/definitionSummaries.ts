import { LoadType } from '../src/dpr/types/UserReports'
import { components } from '../src/dpr/types/api'
import { requestExampleVariants } from './report/mockVariants/request-examples'
import { reportTemplates } from './report/mockVariants/report-templates'
import { mockReportVariants } from './report/mockVariants/mock-report'
import { filterInputExamplesVariants } from './report/mockVariants/filter-input-examples'
import { featureTestingVariants } from './report/mockVariants/feature-testing'

import { requestExamples, visualisations, features } from './dashboard/definitions'

export const summaries: components['schemas']['ReportDefinitionSummary'][] = [
  {
    id: 'request-examples',
    name: 'Request examples',
    description: 'Example variants used for request testing',
    variants: requestExampleVariants.map(({ id, name, description }) => ({
      id,
      name,
      description: description || '',
      isMissing: false,
    })),
    dashboards: requestExamples,
    authorised: true,
  },
  {
    id: 'report-template-examples',
    name: 'Report templates',
    description: 'Example variants used for template testing',
    variants: <components['schemas']['VariantDefinitionSummary'][]>reportTemplates.map(
      ({ id, name, description, loadType }) => ({
        id,
        name,
        description: description || '',
        isMissing: false,
        ...(loadType && { loadType }),
      }),
    ),
    dashboards: [],
    authorised: true,
  },
  {
    id: 'mock-report',
    name: 'Mock reports',
    description: 'Example variants',
    variants: mockReportVariants.map(({ id, name, description }) => ({
      id,
      name,
      description: description || '',
      isMissing: false,
    })),
    dashboards: [],
    authorised: true,
  },
  {
    id: 'unauthorised-report',
    name: 'Unauthorised report',
    description: 'unauthorised reports',
    variants: mockReportVariants.map(({ id, name, description }) => ({
      id,
      name,
      description: description || '',
      isMissing: false,
    })),
    dashboards: [],
    authorised: false,
  },
  {
    id: 'filter-inputs',
    name: 'Filter input testing',
    description: 'Example variants used for input testing',
    variants: filterInputExamplesVariants.map(({ id, name, description }) => ({
      id,
      name,
      description: description || '',
      isMissing: false,
    })),
    dashboards: [],
    authorised: true,
  },
  {
    id: 'feature-testing',
    name: 'Feature testing',
    description: 'Example variants used for feature testing',
    variants: featureTestingVariants.map(({ id, name, description }) => {
      const isScheduled = [
        'feature-testing-scheduled',
        'feature-testing-scheduled-2',
        'feature-testing-scheduled-3',
      ].includes(id)

      return {
        id,
        name,
        description: description || '',
        isMissing: /feature-testing-missing-[1-3]/.test(id),
        ...(id === 'feature-testing-sync' && { loadType: LoadType.SYNC }),
        ...(isScheduled && { schedule: 'at 10:15 every day between Monday and Friday' }),
      }
    }),
    dashboards: (<components['schemas']['DashboardDefinitionSummary'][]>features).map(
      ({ id, name, description, loadType }) => {
        return {
          id,
          name,
          description: description || '',
          isMissing: false,
          ...(loadType && { loadType }),
        }
      },
    ),
    authorised: true,
  },
  {
    id: 'dashboard-visualisations',
    name: 'Dashboard visualisations',
    description: 'Example variants used for dashboard visualisation testing',
    variants: [],
    dashboards: visualisations,
    authorised: true,
  },
]
