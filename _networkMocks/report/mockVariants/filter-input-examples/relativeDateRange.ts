const dayjs = require('dayjs')
import { components } from "src/dpr/types/api";

export const variant15: components['schemas']['VariantDefinition'] = {
  id: 'variantId-15',
  name: 'Relative Daterange',
  description: 'Relative Daterange variant',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    sections: [],
    template: 'list',
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
        },
      },
    ],
  },
}
