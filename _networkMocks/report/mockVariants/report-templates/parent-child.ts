import { components } from 'src/dpr/types/api'
import { LoadType } from 'src/dpr/types/UserReports'

const reportTemplateExampleParentChild: components['schemas']['VariantDefinition'] & { loadType: LoadType } = {
  loadType: LoadType.ASYNC,
  id: 'report-template-example-parent-child',
  name: 'Parent Child Template',
  description: 'A report with parent and child datasets',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    sections: [],
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
        calculated: false,
        header: false,
      },
      {
        name: 'field1',
        display: 'Second',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
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
        sections: ['section1'],
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
            calculated: false,
            header: false,
          },
          {
            name: 'field2',
            display: 'Field2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
            calculated: false,
            header: false,
          },
          {
            name: 'field3',
            display: 'Field3',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
            calculated: false,
            header: false,
          },
        ],
      },
    },
  ],
}

export default reportTemplateExampleParentChild
