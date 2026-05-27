import { components } from 'src/dpr/types/api'

const autoCompleteMultiMinMaxExample: components['schemas']['VariantDefinition'] = {
  id: 'autocompletemultiMinMaxExample',
  name: 'Establishment autocomplete multi min max',
  description: 'Autocomplete Multiselect with min and max validation example',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'pre-request-autocompletemulti',
        display: 'Pre-request autocompletemulti',
        sortable: false,
        visible: true,
        type: 'string',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        fieldSource: 'specfield',
        filter: {
          mandatory: false,
          type: 'autocompletemulti',
          staticOptions: [
            { name: 'value1', display: 'Value 1' },
            { name: 'value2', display: 'Value 2' },
            { name: 'value3', display: 'Value 3' },
            { name: 'value4', display: 'Value 4' },
            { name: 'value5', display: 'Value 5' },
          ],
          minSelected: 2,
          maxSelected: 3,
          interactive: false,
        },
      },
      {
        name: 'interactive-autocompletemulti',
        display: 'Interactive autocompletemulti',
        sortable: false,
        visible: true,
        type: 'string',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        fieldSource: 'specfield',
        filter: {
          mandatory: false,
          type: 'autocompletemulti',
          staticOptions: [
            { name: 'value1', display: 'Value 1' },
            { name: 'value2', display: 'Value 2' },
            { name: 'value3', display: 'Value 3' },
            { name: 'value4', display: 'Value 4' },
            { name: 'value5', display: 'Value 5' },
          ],
          minSelected: 2,
          maxSelected: 3,
          interactive: true,
        },
      },
    ],
  },
}

export default autoCompleteMultiMinMaxExample
