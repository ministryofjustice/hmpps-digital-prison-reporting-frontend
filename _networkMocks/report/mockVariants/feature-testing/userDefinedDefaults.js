const featureTestingUserDefinedDefaults = {
  id: 'feature-testing-user-defined-defaults',
  name: 'User context defined defaults',
  description: 'Filters will be populated with data from the user context',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
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
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'value1.1', display: 'Value 1.1' },
            { name: 'value1.2', display: 'Value 1.2' },
            { name: 'value1.3', display: 'Value 1.3' },
          ],
          defaultValue: 'value1.2',
          mandatory: false,
        },
      },
      {
        name: 'field2',
        display: 'Establishment',
        visible: false,
        sortable: false,
        type: 'string',
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: true,
          },
          staticOptions: [
            { name: 'KMI ', display: 'KIRKHAM (HMP)' },
            { name: 'PRI', display: 'PARC (HMP)' },
            { name: 'MSI', display: 'MAIDSTONE (HMP)' },
          ],
          mandatory: false,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'HTML',
        mandatory: true,
        visible: true,
        filter: {
          type: 'text',
        },
      },
    ],
  },
}

module.exports = featureTestingUserDefinedDefaults
