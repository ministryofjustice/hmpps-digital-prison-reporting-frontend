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
      classes: 'dpr-parent-cell',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '01/02/03',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'oranges',
      format: 'numeric',
      text: '5',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'lemons',
      format: 'string',
      text: 'Yes',
    },
  ],
  [
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '01/02/03',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'oranges',
      format: 'numeric',
      text: '6',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'lemons',
      format: 'string',
      text: 'No',
    },
  ],
  [
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'A',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '02/01/03',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'oranges',
      format: 'numeric',
      text: '7',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'lemons',
      format: 'string',
      text: 'Yeah',
    },
  ],
  [
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionOne',
      format: 'string',
      text: 'B',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'sectionTwo',
      format: 'string',
      text: '02/01/03',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'oranges',
      format: 'numeric',
      text: '8',
    },
    {
      classes: 'dpr-parent-cell',
      fieldName: 'lemons',
      format: 'string',
      text: 'Nah',
    },
  ],
]

const childResultTables = [
  [
    {
      classes: 'dpr-child-report-cell',
      colspan: 4,
      format: 'string',
      html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Cheddar</td></tr></tbody></table></div></div>",
    },
  ],
  [
    {
      classes: 'dpr-child-report-cell',
      colspan: 4,
      format: 'string',
      html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>No</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Wendsleydale</td></tr></tbody></table></div></div>",
    },
  ],
  [
    {
      classes: 'dpr-child-report-cell',
      colspan: 4,
      format: 'string',
      html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Gouda</td></tr></tbody></table></div></div>",
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
          classes: 'dpr-section-header-spacer',
          colspan: 4,
          text: '',
        },
      ],
      [
        {
          classes: 'dpr-section-header',
          colspan: 4,
          html: '<h2 class="govuk-heading-m">Section: one <span class=\'govuk-caption-m\'>2 results</span></h2>',
        },
      ],
      [
        {
          classes: 'dpr-section-header-spacer-bottom',
          colspan: 4,
          text: '',
        },
      ],
      [
        { text: 'Section One', classes: 'govuk-table__header' },
        { text: 'Section Two', classes: 'govuk-table__header' },
        { text: 'Oranges!', classes: 'govuk-table__header' },
        { text: 'Lemons?!', classes: 'govuk-table__header' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'sectionTwo', text: '01/02/03', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'oranges', text: '5', format: 'numeric', classes: 'dpr-parent-cell' },
        { fieldName: 'lemons', text: 'Yes', format: 'string', classes: 'dpr-parent-cell' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'sectionTwo', text: '01/02/03', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'oranges', text: '6', format: 'numeric', classes: 'dpr-parent-cell' },
        { fieldName: 'lemons', text: 'No', format: 'string', classes: 'dpr-parent-cell' },
      ],
      [
        {
          classes: 'dpr-child-report-cell',
          format: 'string',
          html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>No</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Wendsleydale</td></tr></tbody></table></div></div>",
          colspan: 4,
        },
      ],
      [
        {
          classes: 'dpr-section-header-spacer',
          colspan: 4,
          text: '',
        },
      ],
      [
        {
          classes: 'dpr-section-header',
          colspan: 4,
          html: '<h2 class="govuk-heading-m">Section: two <span class=\'govuk-caption-m\'>2 results</span></h2>',
        },
      ],
      [
        {
          classes: 'dpr-section-header-spacer-bottom',
          colspan: 4,
          text: '',
        },
      ],
      [
        { text: 'Section One', classes: 'govuk-table__header' },
        { text: 'Section Two', classes: 'govuk-table__header' },
        { text: 'Oranges!', classes: 'govuk-table__header' },
        { text: 'Lemons?!', classes: 'govuk-table__header' },
      ],
      [
        { fieldName: 'sectionOne', text: 'A', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'sectionTwo', text: '02/01/03', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'oranges', text: '7', format: 'numeric', classes: 'dpr-parent-cell' },
        { fieldName: 'lemons', text: 'Yeah', format: 'string', classes: 'dpr-parent-cell' },
      ],
      [
        {
          classes: 'dpr-child-report-cell',
          format: 'string',
          html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Cheddar</td></tr></tbody></table></div></div>",
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
        { fieldName: 'sectionOne', text: 'B', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'sectionTwo', text: '02/01/03', format: 'string', classes: 'dpr-parent-cell' },
        { fieldName: 'oranges', text: '8', format: 'numeric', classes: 'dpr-parent-cell' },
        { fieldName: 'lemons', text: 'Nah', format: 'string', classes: 'dpr-parent-cell' },
      ],
      [
        {
          classes: 'dpr-child-report-cell',
          format: 'string',
          html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Cheese</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--numeric '>Gouda</td></tr></tbody></table></div></div>",
          colspan: 4,
        },
      ],
    ])
  })
})
