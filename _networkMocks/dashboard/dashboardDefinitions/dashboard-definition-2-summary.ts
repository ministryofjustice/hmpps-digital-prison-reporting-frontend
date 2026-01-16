import { components } from 'dpr/types/api'

export const testingDashboard2 = {
  id: '167078.RS',
  name: 'Summary',
  description: '',
  sections: [
    {
      id: '167078.RS.1',
      display: 'Title',
      description: 'Description',
      visualisations: [
        {
          id: '167078.RS.1.1',
          type: 'list',
          display: 'Table name',
          columns: {
            keys: [
              {
                id: 'OFFENDER_ID_DISPLAY',
                display: 'Offender Id',
              },
            ],
            measures: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
            expectNulls: false,
          },
        },
      ],
    },
  ],
  filterFields: [
    {
      name: 'establishment_code',
      display: 'Establishment',
      filter: {
        type: 'autocomplete',
        mandatory: true,
        staticOptions: [
          {
            name: 'PBI',
            display: 'PETERBOROUGH (HMP)',
          },
          {
            name: 'CDI',
            display: 'CHELMSFORD (HMP)',
          },
          {
            name: 'WLI',
            display: 'WAYLAND (HMP)',
          },
          {
            name: 'LTI',
            display: 'LITTLEHEY (HMP)',
          },
          {
            name: 'FNI',
            display: 'FULL SUTTON (HMP)',
          },
          {
            name: 'CLI',
            display: 'COLDINGLEY (HMP)',
          },
          {
            name: 'WEI',
            display: 'WEALSTUN (HMP)',
          },
        ],
        interactive: true,
      },
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
      calculated: false,
      header: false,
    },
    {
      name: 'wing',
      display: 'Wing (All for all)',
      filter: {
        type: 'autocomplete',
        mandatory: true,
        staticOptions: [
          {
            name: 'PBI-HCU',
            display: 'PBI-HCU',
          },
          {
            name: 'PBI-H3',
            display: 'PBI-H3',
          },
          {
            name: 'PBI-H4',
            display: 'PBI-H4',
          },
          {
            name: 'PBI-RECP',
            display: 'PBI-RECP',
          },
          {
            name: 'PBI-TAP',
            display: 'PBI-TAP',
          },
          {
            name: 'WBI-I',
            display: 'WBI-I',
          },
          {
            name: 'WOI-D',
            display: 'WOI-D',
          },
          {
            name: 'WOI-B',
            display: 'WOI-B',
          },
          {
            name: 'WOI-K',
            display: 'WOI-K',
          },
          {
            name: 'WOI-RECP',
            display: 'WOI-RECP',
          },
          {
            name: 'WOI-A',
            display: 'WOI-A',
          },
          {
            name: 'All',
            display: 'All',
          },
        ],
        interactive: false,
      },
      sortable: false,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: false,
      calculated: false,
      header: false,
    },
  ],
}
