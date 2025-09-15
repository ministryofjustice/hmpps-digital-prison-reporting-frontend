import { components } from "src/dpr/types/api";

export const variant25: components['schemas']['VariantDefinition'] = {
  id: 'variantId-25',
  name: 'Granular Daterange',
  description: 'Granular Daterange variant',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        filter: {
          type: 'granulardaterange',
          defaultValue: '2003-02-01 - 2006-05-04',
          defaultQuickFilterValue: 'last-three-months',
          mandatory: true,
          defaultGranularity: 'daily',
        },
      },
    ],
  },
}
