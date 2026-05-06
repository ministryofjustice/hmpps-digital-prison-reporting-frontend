import { components } from 'src'
import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_complete-dataset_with-links',
  name: 'List - with links',
  description:
    'This dashboard represents example list visualisations using a complete dataset. The dashboard aims to show a list with a link in it',
  sections: [
    {
      id: 'section-1',
      display: 'Links in list',
      description: 'Exmaple showing links in lists',
      visualisations: [
        {
          id: 'links-in-list',
          type: DashboardVisualisationType.LIST,
          display: 'List with links in it',
          description: 'Example list with a link it in',
          columns: {
            keys: [
              {
                id: 'establishment_id',
              },
            ],
            measures: [
              {
                id: 'html_link',
                display: 'HTML link',
                type: 'HTML',
              },
            ],
            expectNulls: false,
          },
        },
      ],
    },
  ],
  filterFields: [],
}
