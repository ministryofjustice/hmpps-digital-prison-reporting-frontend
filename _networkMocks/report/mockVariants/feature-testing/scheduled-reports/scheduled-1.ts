import { VariantDefinitionWithSchedule } from 'src/dpr/types/Subscriptions'

export const featureTestingScheduled: VariantDefinitionWithSchedule = {
  id: 'feature-testing-scheduled',
  name: 'Scheduled Report',
  description: 'This is an scheduled report',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  interactive: true,
  schedule: 'Weekly at 9:00am',
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
