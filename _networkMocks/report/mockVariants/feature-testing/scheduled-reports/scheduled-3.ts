import { components } from 'src/dpr/types/api'

export const featureTestingScheduled3: components['schemas']['VariantDefinition'] = {
  id: 'feature-testing-scheduled-3',
  name: 'Scheduled Report 3',
  description: 'This is third scheduled report',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  interactive: true,
  specification: {
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: true,
        defaultsort: true,
        type: 'string',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
        fieldSource: 'specfield',
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'value1.1', display: 'Value 1.1' },
            { name: 'value1.2', display: 'Value 1.2' },
            { name: 'value1.3', display: 'Value 1.3' },
          ],
          defaultValue: 'value1.2',
          mandatory: false,
          interactive: true,
        },
      },
    ],
  },
}
