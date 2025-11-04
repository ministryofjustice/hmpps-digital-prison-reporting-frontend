const featureTesting = {
  id: 'feature-testing-filter-order',
  name: 'Filter Order',
  description: '',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
          index: 2,
        },
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
          index: 0,
        },
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
        },
      },
      {
        name: 'field4',
        display: 'Field 4',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
          interactive: true,
          index: 2,
        },
      },
      {
        name: 'field5',
        display: 'Field 5',
        sortable: false,
        type: 'HTML',
        mandatory: false,
        visible: true,
        filter: {
          type: 'text',
          interactive: true,
          index: 0,
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
          type: 'text',
          interactive: true,
        },
      },
    ],
  },
}

module.exports = featureTesting
