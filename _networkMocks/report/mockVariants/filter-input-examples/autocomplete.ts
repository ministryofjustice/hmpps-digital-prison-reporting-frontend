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
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
          },
          staticOptions: [
            { name: 'MDI', display: 'Moorland (HMP & YOI)' },
            { name: 'KMI', display: 'KIRKHAM (HMP)' },
            { name: 'LCI', display: 'LEICESTER' },
            { name: 'MSI', display: 'MAIDSTONE (HMP)' },
            { name: 'VMI', display: 'WYMOTT (HMP)' },
          ],
          mandatory: false,
        },
      },
    ],
  },
}
