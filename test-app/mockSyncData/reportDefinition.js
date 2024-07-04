const defaultVariant = {
  id: 'test-variant',
  name: 'Test Variant',
  description: 'Test Variant Description',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
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
          defaultValue: 'value1.1',
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        mandatory: true,
        visible: true,
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
        visible: true,
        type: 'date',
        mandatory: false,
        filter: {
          type: 'daterange',
          defaultValue: '2003-02-01 - 2006-05-04',
          min: '2003-02-01',
          max: '2007-05-04',
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
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
            { name: 'Fezzick', display: 'Fezzick' },
            { name: 'Inigo Montoya', display: 'Inigo Montoya' },
            { name: 'Prince Humperdink', display: 'Prince Humperdink' },
            { name: 'Princess Buttercup', display: 'Princess Buttercup' },
            { name: 'Westley', display: 'Westley' },
          ],
        },
      },
      {
        name: 'field5',
        display: 'Field 5',
        sortable: false,
        type: 'string',
        mandatory: false,
        visible: false,
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: false,
          },
        },
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text'
        }
      },
    ],
  },
}

const validationVariant = {
  id: 'test-validation-variant',
  name: 'Test Validation Variant',
  description: 'Test Validation Variant Description',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
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
          mandatory: true,
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: true,
        type: 'string',
        mandatory: false,
        visible: true,
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'value2.1', display: 'Value 2.1' },
            { name: 'value2.2', display: 'Value 2.2' },
            { name: 'value2.3', display: 'Value 2.3' },
          ],
          mandatory: true,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'date',
        mandatory: false,
        visible: true,
        filter: {
          type: 'daterange',
          min: '2003-02-01',
          max: '2007-05-04',
          mandatory: true,
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
        sortable: false,
        type: 'string',
        visible: true,
        filter: {
          type: 'autocomplete',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: true
          },
          staticOptions: [
            { name: 'Fezzick', display: 'Fezzick' },
            { name: 'Inigo Montoya', display: 'Inigo Montoya' },
            { name: 'Prince Humperdink', display: 'Prince Humperdink' },
            { name: 'Princess Buttercup', display: 'Princess Buttercup' },
            { name: 'Westley', display: 'Westley' },
          ],
          mandatory: true,
          pattern: '(?!Invalid).+',
        },
      },
      {
        name: 'field6',
        display: 'Field 6',
        sortable: false,
        type: 'string',
        mandatory: false,
        filter: {
          type: 'text',
          pattern: 'Value 6\\.\\d',
          mandatory: true,
        }
      },
    ],
  },
}

const variants = [defaultVariant, validationVariant]

module.exports = {
  report: {
    id: 'test-report',
    name: 'Test Report',
    variants,
  },
  singleVariantReport: (variantId) => ({
    id: 'test-report',
    name: 'Test Report',
    variant: variants.find(v => v.id === variantId),
  }),
  variant: defaultVariant,
}
