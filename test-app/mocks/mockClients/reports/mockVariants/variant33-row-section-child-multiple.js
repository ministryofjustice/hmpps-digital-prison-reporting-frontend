const variant31 = {
  id: 'variantId-33',
  name: 'Sectioned Rows + child template (multiple rows)',
  description: 'A report with sectioned rows and child report, with multiple dataset rows',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'row-section-child',
    sectionedFields: [
      {
        name: 'section1',
        fields: ['field1', 'field2'],
      },
      {
        name: 'section2',
        child: 'variantId-33-child',
      },
      {
        name: 'section3',
        child: 'variantId-33-child-2',
      },
    ],
    fields: [
      {
        name: 'field1',
        display: 'Field One',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field2',
        display: 'Field Two',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'joinField',
        display: 'Join Field',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section1',
        display: 'Data columns as rows',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section2',
        display: 'Child report',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section3',
        display: 'Child report 2',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
    ],
  },
  childVariants: [
    {
      id: 'variantId-33-child',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['joinField'],
      specification: {
        template: 'row-section-child',
        fields: [
          {
            name: 'childField1',
            display: 'Child field 1',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'childField2',
            display: 'Child field 2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'joinField',
            display: 'Join Field',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
        ],
      },
    },
    {
      id: 'variantId-33-child-2',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['joinField'],
      specification: {
        template: 'row-section-child',
        fields: [
          {
            name: 'childField1',
            display: 'Child field 1',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'childField2',
            display: 'Child field 2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'joinField',
            display: 'Join Field',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
        ],
      },
    },
  ],
}

module.exports = variant31
