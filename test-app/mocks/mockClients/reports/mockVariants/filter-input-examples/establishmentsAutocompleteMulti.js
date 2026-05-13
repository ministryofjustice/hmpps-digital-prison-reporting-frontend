// @ts-nocheck
const variant25 = {
  id: 'establishmentAutocompleteMulti',
  name: 'Establishment autocomplete multiselect',
  description: 'Establishment autocomplete multi example',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: false,
  specification: {
    template: 'list',
    fields: [
      {
        name: 'establishment',
        display: 'Establishment',
        sortable: false,
        visible: true,
        type: 'string',
        mandatory: false,
        filter: {
          type: 'autocompleteMulti',
          dynamicOptions: {
            minimumLength: 3,
            returnAsStaticOptions: true,
          },
          staticOptions: [
            { name: 'ABC', display: 'Est one' },
            { name: 'DEF', display: 'Est two' },
            { name: 'GHI', display: 'Est three' },
            { name: 'JKL', display: 'Est four' },
            { name: 'MNO', display: 'Est five' },
          ],
          mandatory: false,
        },
      },
    ],
  },
}

module.exports = variant25
