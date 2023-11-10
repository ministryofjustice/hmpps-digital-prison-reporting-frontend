const variant = {
  id: 'test-variant',
  name: 'Test Variant',
  resourceName: 'reports/list',
  specification: {
    fields: [
      {
        name: 'field1',
        displayName: 'Field 1',
        sortable: true,
        defaultSortColumn: true,
        type: 'String',
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'value1.1', displayName: 'Value 1.1' },
            { name: 'value1.2', displayName: 'Value 1.2' },
            { name: 'value1.3', displayName: 'Value 1.3' },
          ],
        },
      },
      {
        name: 'field2',
        displayName: 'Field 2',
        sortable: true,
        type: 'String',
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'value2.1', displayName: 'Value 2.1' },
            { name: 'value2.2', displayName: 'Value 2.2' },
            { name: 'value2.3', displayName: 'Value 2.3' },
          ],
        },
      },
      {
        name: 'field3',
        displayName: 'Field 3',
        sortable: false,
        type: 'Date',
        filter: {
          type: 'DateRange',
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
