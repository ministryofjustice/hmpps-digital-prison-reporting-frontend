import Dict = NodeJS.Dict
import { components } from '../../types/api'
import SectionedDataTableBuilder from './SectionedDataTableBuilder'

const data: Array<Dict<string>> = [
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    oranges: '5',
    lemons: 'Yes',
  },
  {
    sectionOne: 'A',
    sectionTwo: '01/02/03',
    oranges: '6',
    lemons: 'No',
  },
  {
    sectionOne: 'A',
    sectionTwo: '02/01/03',
    oranges: '7',
    lemons: 'Yeah',
  },
  {
    sectionOne: 'B',
    sectionTwo: '02/01/03',
    oranges: '8',
    lemons: 'Nah',
  },
]
const fields: Array<components['schemas']['FieldDefinition']> = [
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
]
const specification: components['schemas']['Specification'] = {
  fields,
  template: 'list-section',
  sections: ['sectionOne', 'sectionTwo'],
}

const headerResultRow = [
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
const sectionHeaders = [
  [
    {
      colspan: 2,
      html: "<h2>Section One: A, Section Two: 01/02/03 <span class='govuk-caption-m'>2 results</span></h2>",
    },
  ],
  [
    {
      colspan: 2,
      html: "<h2>Section One: A, Section Two: 02/01/03 <span class='govuk-caption-m'>1 result</span></h2>",
    },
  ],
  [
    {
      colspan: 2,
      html: "<h2>Section One: B, Section Two: 02/01/03 <span class='govuk-caption-m'>1 result</span></h2>",
    },
  ],
]
describe('buildTable', () => {
  it('Sections added correctly', () => {
    const mapped = new SectionedDataTableBuilder(specification)
      .withNoHeaderOptions(['oranges', 'lemons'])
      .buildTable(data)

    expect(mapped.rows).toEqual([
      sectionHeaders[1],
      headerResultRow,
      resultRows[2],
      sectionHeaders[0],
      headerResultRow,
      resultRows[0],
      resultRows[1],
      sectionHeaders[2],
      headerResultRow,
      resultRows[3],
    ])
    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(2)
    expect(mapped.rowCount).toEqual(4)
  })

  it('Section table summaries added correctly', () => {
    const mapped = new SectionedDataTableBuilder(specification)
      .withNoHeaderOptions(['oranges', 'lemons'])
      .withSummaries({
        'table-header': [
          {
            id: 'table-header',
            template: 'table-header',
            fields: [],
            data: [
              {
                sectionOne: 'A',
                sectionTwo: '01/02/03',
                oranges: 'Fruit',
                lemons: 'Lots',
              },
              {
                sectionOne: 'A',
                sectionTwo: '02/01/03',
                oranges: 'Fruit',
                lemons: 'Not so much',
              },
            ],
          },
        ],
        'table-footer': [
          {
            id: 'table-footer',
            template: 'table-footer',
            fields: [],
            data: [
              {
                sectionOne: 'A',
                sectionTwo: '02/01/03',
                oranges: 'Strawberry',
                lemons: 'Lime',
              },
              {
                sectionOne: 'B',
                sectionTwo: '02/01/03',
                oranges: 'Apples',
                lemons: 'Oh no',
              },
            ],
          },
        ],
      })
      .buildTable(data)

    expect(mapped.rows).toEqual([
      sectionHeaders[1],
      headerResultRow,
      [
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
          fieldName: 'oranges',
          format: 'numeric',
          text: 'Fruit',
        },
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
          fieldName: 'lemons',
          format: 'string',
          text: 'Not so much',
        },
      ],
      resultRows[2],
      [
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
          fieldName: 'oranges',
          format: 'numeric',
          text: 'Strawberry',
        },
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
          fieldName: 'lemons',
          format: 'string',
          text: 'Lime',
        },
      ],
      sectionHeaders[0],
      headerResultRow,
      [
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
          fieldName: 'oranges',
          format: 'numeric',
          text: 'Fruit',
        },
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
          fieldName: 'lemons',
          format: 'string',
          text: 'Lots',
        },
      ],
      resultRows[0],
      resultRows[1],
      sectionHeaders[2],
      headerResultRow,
      resultRows[3],
      [
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
          fieldName: 'oranges',
          format: 'numeric',
          text: 'Apples',
        },
        {
          classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
          fieldName: 'lemons',
          format: 'string',
          text: 'Oh no',
        },
      ],
    ])
    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(2)
    expect(mapped.rowCount).toEqual(4)
  })

  it('Section summaries added correctly', () => {
    const mapped = new SectionedDataTableBuilder(specification)
      .withNoHeaderOptions(['oranges', 'lemons'])
      .withSummaries({
        'section-header': [
          {
            id: 'section-header',
            template: 'section-header',
            fields: [
              {
                name: 'squishy',
                display: 'Squishy?',
                type: 'boolean',
              },
            ],
            data: [
              {
                sectionOne: 'A',
                sectionTwo: '01/02/03',
                squishy: 'Yes',
              },
              {
                sectionOne: 'A',
                sectionTwo: '02/01/03',
                squishy: 'No',
              },
            ],
          },
        ],
        'section-footer': [
          {
            id: 'section-footer',
            template: 'section-footer',
            fields: [
              {
                name: 'preference',
                display: 'Preference',
                type: 'string',
              },
              {
                name: 'eaten',
                display: 'Eaten',
                type: 'long',
              },
            ],
            data: [
              {
                sectionOne: 'A',
                sectionTwo: '02/01/03',
                preference: 'Oranges',
                eaten: '2005',
              },
              {
                sectionOne: 'B',
                sectionTwo: '02/01/03',
                preference: 'NO',
                eaten: '0',
              },
              {
                sectionOne: 'B',
                sectionTwo: '02/01/03',
                preference: 'No, really',
                eaten: '0',
              },
            ],
          },
        ],
      })
      .buildTable(data)

    expect(mapped.rows).toEqual([
      sectionHeaders[1],
      [
        {
          colspan: 2,
          html: "<div class='dpr-summary-container-group dpr-summary-container-group-section-header'><div class='dpr-summary-container'><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Squishy?</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>No</td></tr></tbody></table></div></div>",
        },
      ],
      headerResultRow,
      resultRows[2],
      [
        {
          colspan: 2,
          html: "<div class='dpr-summary-container-group dpr-summary-container-group-section-footer'><div class='dpr-summary-container'><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Preference</th><th scope='col' class='govuk-table__header'>Eaten</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Oranges</td><td class='govuk-table__cell govuk-table__cell--numeric '>2005</td></tr></tbody></table></div></div>",
        },
      ],
      sectionHeaders[0],
      [
        {
          colspan: 2,
          html: "<div class='dpr-summary-container-group dpr-summary-container-group-section-header'><div class='dpr-summary-container'><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Squishy?</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Yes</td></tr></tbody></table></div></div>",
        },
      ],
      headerResultRow,
      resultRows[0],
      resultRows[1],
      sectionHeaders[2],
      headerResultRow,
      resultRows[3],
      [
        {
          colspan: 2,
          html: "<div class='dpr-summary-container-group dpr-summary-container-group-section-footer'><div class='dpr-summary-container'><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Preference</th><th scope='col' class='govuk-table__header'>Eaten</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>No, really</td><td class='govuk-table__cell govuk-table__cell--numeric '>0</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>NO</td><td class='govuk-table__cell govuk-table__cell--numeric '>0</td></tr></tbody></table></div></div>",
        },
      ],
    ])
    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(2)
    expect(mapped.rowCount).toEqual(4)
  })

  it('Large volumes of sections added correctly', () => {
    let bigData: Dict<string>[] = []

    for (let d = 0; d < 10000; d += 1) {
      bigData = bigData.concat(data)
    }

    const mapped = new SectionedDataTableBuilder(specification)
      .withNoHeaderOptions(['oranges', 'lemons'])
      .buildTable(bigData)

    expect(mapped.head).toBeNull()
    expect(mapped.colCount).toEqual(2)
    expect(mapped.rowCount).toEqual(40000)
    expect(mapped.rows.length).toEqual(40006)
  })
})
