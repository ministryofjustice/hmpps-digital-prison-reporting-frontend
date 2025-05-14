import Dict = NodeJS.Dict
import { components } from '../../types/api'
import ParentChildDataTableBuilder from './ParentChildDataTableBuilder'

const data: Array<Dict<string>> = [
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    oranges: '5',
    lemons: 'Yes',
    section: 'one',
  },
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    oranges: '6',
    lemons: 'No',
    section: 'one',
  },
  {
    sectionOne: 'A',
    sectionTwo: '02/01/03',
    oranges: '7',
    lemons: 'Yeah',
    section: 'two',
  },
  {
    sectionOne: 'B',
    sectionTwo: '02/01/03',
    oranges: '8',
    lemons: 'Nah',
    section: 'two',
  },
]

const childData: Array<Dict<string>> = [
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    cheese: 'No',
  },
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    cheese: 'Wendsleydale',
  },
  {
    sectionOne: 'A',
    sectionTwo: '02/01/03',
    cheese: 'Cheddar',
  },
  {
    sectionOne: 'B',
    sectionTwo: '02/01/03',
    cheese: 'Gouda',
  },
]

const parentFields: Array<components['schemas']['FieldDefinition']> = [
  {
    name: 'sectionOne',
    display: 'Section One',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: true,
    calculated: false,
  },
  {
    name: 'sectionTwo',
    display: 'Section Two',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: true,
    calculated: false,
  },
  {
    name: 'oranges',
    display: 'Oranges!',
    sortable: true,
    defaultsort: true,
    type: 'long',
    mandatory: false,
    visible: true,
    calculated: false,
  },
  {
    name: 'lemons',
    display: 'Lemons?!',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: true,
    calculated: false,
  },
  {
    name: 'section',
    display: 'Section',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: false,
    calculated: false,
  },
]

const childFields: Array<components['schemas']['FieldDefinition']> = [
  {
    name: 'sectionOne',
    display: 'Section One',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: false,
    calculated: false,
  },
  {
    name: 'sectionTwo',
    display: 'Section Two',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: false,
    calculated: false,
  },
  {
    name: 'cheese',
    display: 'Cheese',
    sortable: true,
    defaultsort: true,
    type: 'long',
    mandatory: false,
    visible: true,
    calculated: false,
  },
]

const parentSpecification: components['schemas']['Specification'] = {
  fields: parentFields,
  template: 'parent-child',
  sections: [],
}

const childSpecification: components['schemas']['Specification'] = {
  fields: childFields,
  template: 'list',
  sections: [],
}

const parentVariant: components['schemas']['VariantDefinition'] = {
  id: 'parentId',
  name: 'Parent',
  resourceName: '/parent',
  specification: parentSpecification,
  childVariants: [
    {
      id: 'childId',
      name: 'Child',
      resourceName: '/child',
      joinFields: ['sectionOne', 'sectionTwo'],
      specification: childSpecification,
    },
  ],
}

const headerResultRow = [
  {
    classes: 'govuk-table__header',
    text: 'Section One',
  },
  {
    classes: 'govuk-table__header',
    text: 'Section Two',
  },
  {
    classes: 'govuk-table__header',
    text: 'Oranges!',
  },
  {
    classes: 'govuk-table__header',
    text: 'Lemons?!',
  },
]

const resultRows = [
  [
    {
      classes: '',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: '',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '01/02/03',
    },
    {
      classes: '',
      fieldName: 'oranges',
      format: 'numeric',
      text: '5',
    },
    {
      classes: '',
      fieldName: 'lemons',
      format: 'string',
      text: 'Yes',
    },
  ],
  [
    {
      classes: '',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: '',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '01/02/03',
    },
    {
      classes: '',
      fieldName: 'oranges',
      format: 'numeric',
      text: '6',
    },
    {
      classes: '',
      fieldName: 'lemons',
      format: 'string',
      text: 'No',
    },
  ],
  [
    {
      classes: '',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: '',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '02/01/03',
    },
    {
      classes: '',
      fieldName: 'oranges',
      format: 'numeric',
      text: '7',
    },
    {
      classes: '',
      fieldName: 'lemons',
      format: 'string',
      text: 'Yeah',
    },
  ],
  [
    {
      classes: '',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'B',
    },
    {
      classes: '',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '02/01/03',
    },
    {
      classes: '',
      fieldName: 'oranges',
      format: 'numeric',
      text: '8',
    },
    {
      classes: '',
      fieldName: 'lemons',
      format: 'string',
      text: 'Nah',
    },
  ],
]

const childResultTables = [
  [
    {
      colspan: 4,
      format: 'string',
      html:
        "<div class='dpr-child-report'>" +
        '<h3>Child</h3>' +
        "<table class='govuk-table'>" +
        "<thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead>" +
        "<tbody class='govuk-table__body'>" +
        "<tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Cheddar</td></tr>" +
        '</tbody>' +
        '</table>' +
        '</div>',
    },
  ],
  [
    {
      colspan: 4,
      format: 'string',
      html:
        "<div class='dpr-child-report'>" +
        '<h3>Child</h3>' +
        "<table class='govuk-table'>" +
        "<thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead>" +
        "<tbody class='govuk-table__body'>" +
        "<tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>No</td></tr>" +
        "<tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Wendsleydale</td></tr>" +
        '</tbody>' +
        '</table>' +
        '</div>',
    },
  ],
  [
    {
      colspan: 4,
      format: 'string',
      html:
        "<div class='dpr-child-report'>" +
        '<h3>Child</h3>' +
        "<table class='govuk-table'>" +
        "<thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead>" +
        "<tbody class='govuk-table__body'>" +
        "<tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Gouda</td></tr>" +
        '</tbody></table>' +
        '</div>',
    },
  ],
]

describe('ParentChildDataTableBuilder', () => {
  it('Parent child sections added correctly', () => {
    const mapped = new ParentChildDataTableBuilder(parentVariant)
      .withNoHeaderOptions(['sectionOne', 'sectionTwo', 'oranges', 'lemons'])
      .withChildData([
        {
          id: 'childId',
          data: childData,
        },
      ])
      .buildTable(data)

    expect(mapped.rows).toEqual([
      headerResultRow,
      resultRows[0],
      resultRows[1],
      childResultTables[1],
      headerResultRow,
      resultRows[2],
      childResultTables[0],
      headerResultRow,
      resultRows[3],
      childResultTables[2],
    ])
    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(4)
    expect(mapped.rowCount).toEqual(4)
  })

  it('Missing child data doesnt fail', () => {
    const mapped = new ParentChildDataTableBuilder(parentVariant)
      .withNoHeaderOptions(['sectionOne', 'sectionTwo', 'oranges', 'lemons'])
      .withChildData([])
      .buildTable(data)

    expect(mapped.rows).toEqual([
      headerResultRow,
      resultRows[0],
      resultRows[1],
      headerResultRow,
      resultRows[2],
      headerResultRow,
      resultRows[3],
    ])
    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(4)
    expect(mapped.rowCount).toEqual(4)
  })

  it('sections added correctly', () => {
    parentVariant.specification.sections = ['section']
    parentVariant.specification.template = 'parent-child-section'
    const mapped = new ParentChildDataTableBuilder(parentVariant)
      .withNoHeaderOptions(['sectionOne', 'sectionTwo', 'oranges', 'lemons'])
      .withChildData([
        {
          id: 'childId',
          data: childData,
        },
      ])
      .buildTable(data)

    expect(mapped.rows).toEqual([
      [
        {
          colspan: 4,
          html: "<h2>Section: one <span class='govuk-caption-m'>2 results</span></h2>",
        },
      ],
      [
        { text: 'Section One', classes: 'govuk-table__header' },
        { text: 'Section Two', classes: 'govuk-table__header' },
        { text: 'Oranges!', classes: 'govuk-table__header' },
        { text: 'Lemons?!', classes: 'govuk-table__header' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: '' },
        { fieldName: 'sectionTwo', text: '01/02/03', format: 'string', classes: '' },
        { fieldName: 'oranges', text: '5', format: 'numeric', classes: '' },
        { fieldName: 'lemons', text: 'Yes', format: 'string', classes: '' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: '' },
        { fieldName: 'sectionTwo', text: '01/02/03', format: 'string', classes: '' },
        { fieldName: 'oranges', text: '6', format: 'numeric', classes: '' },
        { fieldName: 'lemons', text: 'No', format: 'string', classes: '' },
      ],
      [
        {
          format: 'string',
          html: "<div class='dpr-child-report'><h3>Child</h3><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>No</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Wendsleydale</td></tr></tbody></table></div>",
          colspan: 4,
        },
      ],
      [
        {
          colspan: 4,
          html: "<h2>Section: two <span class='govuk-caption-m'>2 results</span></h2>",
        },
      ],
      [
        { text: 'Section One', classes: 'govuk-table__header' },
        { text: 'Section Two', classes: 'govuk-table__header' },
        { text: 'Oranges!', classes: 'govuk-table__header' },
        { text: 'Lemons?!', classes: 'govuk-table__header' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: '' },
        { fieldName: 'sectionTwo', text: '02/01/03', format: 'string', classes: '' },
        { fieldName: 'oranges', text: '7', format: 'numeric', classes: '' },
        { fieldName: 'lemons', text: 'Yeah', format: 'string', classes: '' },
      ],
      [
        {
          format: 'string',
          html: "<div class='dpr-child-report'><h3>Child</h3><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Cheddar</td></tr></tbody></table></div>",
          colspan: 4,
        },
      ],
      [
        { text: 'Section One', classes: 'govuk-table__header' },
        { text: 'Section Two', classes: 'govuk-table__header' },
        { text: 'Oranges!', classes: 'govuk-table__header' },
        { text: 'Lemons?!', classes: 'govuk-table__header' },
      ],
      [
        { fieldName: 'sectionOne', text: 'B', format: 'string', classes: '' },
        { fieldName: 'sectionTwo', text: '02/01/03', format: 'string', classes: '' },
        { fieldName: 'oranges', text: '8', format: 'numeric', classes: '' },
        { fieldName: 'lemons', text: 'Nah', format: 'string', classes: '' },
      ],
      [
        {
          format: 'string',
          html: "<div class='dpr-child-report'><h3>Child</h3><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Gouda</td></tr></tbody></table></div>",
          colspan: 4,
        },
      ],
    ])
  })
})
