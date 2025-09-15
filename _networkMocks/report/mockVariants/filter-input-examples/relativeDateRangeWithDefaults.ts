import { components } from "src/dpr/types/api";

export const variant15: components['schemas']['VariantDefinition'] = {
  id: 'relative-daterange-with-default',
  name: 'Relative Daterange with default',
  description: 'Relative Daterange variant',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    sections: [],
    fields: [
      {
        name: 'field1',
        display: 'Relative date-range',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        filter: {
          type: 'daterange',
          mandatory: true,
          defaultQuickFilterValue: 'next-month',
        },
      },
    ],
  },
}
