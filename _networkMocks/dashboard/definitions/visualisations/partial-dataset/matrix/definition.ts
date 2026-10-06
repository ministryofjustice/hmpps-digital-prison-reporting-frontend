import { components } from 'src/dpr/types/api'
import { basicDefinition } from '../../complete-dataset/matrix/definition'

export const partialDefinition: components['schemas']['DashboardDefinition'] = {
  ...basicDefinition,
  id: 'matrix-examples_partial-data',
  name: 'Matrix - Partial data',
  sections: basicDefinition.sections.map(section => ({
    ...section,
    visualisations: section.visualisations.map(vis => ({
      ...vis,
      columns: { ...vis.columns, expectNulls: true },
    })),
  })),
}
