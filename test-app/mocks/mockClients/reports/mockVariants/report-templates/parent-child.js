// @ts-nocheck
const reportTemplateExampleParentChild = {
  id: 'report-template-example-parent-child',
  name: 'Parent Child Template',
  description: 'A report with parent and child datasets',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'parent-child',
    fields: [
      {
        name: 'section1',
        display: 'First',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'field1',
        display: 'Second',
        sortable: true,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
    ],
  },
  childVariants: [
    {
      id: 'report-template-example-parent-child_child',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['section1'],
      specification: {
        template: 'parent-child',
        fields: [
          {
            name: 'section1',
            display: 'First',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
          {
            name: 'field2',
            display: 'Field2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'field3',
            display: 'Field3',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
        ],
      },
    },
    {
      id: 'report-template-example-parent-child_child_2',
      name: 'Child Report 2',
      resourceName: 'reports/list',
      joinFields: ['section1'],
      specification: {
        template: 'parent-child',
        fields: [
          {
            name: 'section1',
            display: 'First',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
          {
            name: 'field2',
            display: 'Field2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'field3',
            display: 'Field3',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
        ],
      },
    },
  ],
}

module.exports = reportTemplateExampleParentChild
