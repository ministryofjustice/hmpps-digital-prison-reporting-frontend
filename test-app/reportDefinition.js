const variant = {
  id: 'test-variant',
  name: 'Test Variant',
  resourceName: 'reports/list',
  specification: {
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: true,
        defaultsort: true,
        type: 'string',
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'value1.1', display: 'Value 1.1' },
            { name: 'value1.2', display: 'Value 1.2' },
            { name: 'value1.3', display: 'Value 1.3' },
          ],
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'value2.1', display: 'Value 2.1' },
            { name: 'value2.2', display: 'Value 2.2' },
            { name: 'value2.3', display: 'Value 2.3' },
          ],
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'date',
        filter: {
          type: 'daterange',
        },
        defaultValue: '2003-02-01 - 2006-05-04',
      },
    ],
  }
}

module.exports = {
  report: {
    id: 'test-report',
    name: 'Test Report',
    variants: [ variant ]
  },
  singleVariantReport: {
    id: 'test-report',
    name: 'Test Report',
    variant: variant
  },
  variant,
}
