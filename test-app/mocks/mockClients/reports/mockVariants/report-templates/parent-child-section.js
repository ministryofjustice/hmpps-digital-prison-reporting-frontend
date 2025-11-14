// @ts-nocheck
const reportTemplateExampleParentChild = {
  id: 'report-template-example-parent-child-section',
  name: 'Parent Child Section Template',
  description: 'A report with parent and child datasets in sections',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'parent-child-section',
    sections: ['section1', 'section2'],
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'childKey',
        display: 'Child key',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'section1',
        display: 'Section 1',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section2',
        display: 'Section 2',
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
      id: 'report-template-example-parent-child-section_child',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['childKey'],
      specification: {
        template: 'parent-child',
        fields: [
          {
            name: 'childKey',
            display: 'no shown',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
          {
            name: 'field1',
            display: 'Child Field 1',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'field2',
            display: 'Child Field 2',
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
