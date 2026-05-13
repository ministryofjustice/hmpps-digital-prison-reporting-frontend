import { components } from 'src/dpr/types/api'

const autoCompleteMultiExample: components['schemas']['VariantDefinition'] = {
  id: 'autocompletemultiExample',
  name: 'Establishment autocomplete multi',
  description: 'Autocomplete Multiselect example',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    sections: [],
    template: 'list',
    fields: [
      {
        name: 'field1',
        display: 'Mutliselect',
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
          type: 'autocompleteMulti',
          staticOptions: [
            { name: 'value1', display: 'Value 1' },
            { name: 'value2', display: 'Value 2' },
            { name: 'value3', display: 'Value 3' },
            { name: 'value4', display: 'Value 4' },
            { name: 'value5', display: 'Value 5' },
            { name: 'value6', display: 'Value 6' },
            { name: 'value7', display: 'Value 7' },
            { name: 'value8', display: 'Value 8' },
            { name: 'value9', display: 'Value 9' },
            { name: 'value10', display: 'Value 10' },
            { name: 'value11', display: 'Value 11' },
            { name: 'value12', display: 'Value 12' },
            { name: 'value13', display: 'Value 13' },
            { name: 'value14', display: 'Value 14' },
            { name: 'value15', display: 'Value 15' },
            { name: 'value16', display: 'Value 16' },
          ],
          defaultValue: 'value1,value2',
          interactive: true,
        },
      },
    ],
  },
}

export default autoCompleteMultiExample
