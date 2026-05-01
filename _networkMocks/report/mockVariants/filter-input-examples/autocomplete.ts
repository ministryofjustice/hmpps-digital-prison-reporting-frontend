import { components } from 'src/dpr/types/api'

export const establishmentAutocomplete: components['schemas']['VariantDefinition'] = {
  id: 'establishmentAutocomplete',
  name: 'Establishment autocomplete',
  description: 'Establishment autocomplete example',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'establishment',
        display: 'Establishment',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        fieldSource: 'specfield',
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
          },
          staticOptions: [
            { name: 'ABC', display: 'Est one' },
            { name: 'DEF', display: 'Est two' },
            { name: 'GHI', display: 'Est three' },
            { name: 'JKL', display: 'Est four' },
            { name: 'MNO', display: 'Est five' },
          ],
          mandatory: false,
        },
      },
    ],
  },
}
