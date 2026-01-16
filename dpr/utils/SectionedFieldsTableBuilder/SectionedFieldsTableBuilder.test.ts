import { expect } from '@jest/globals'
import { components } from '../../types/api'
import SectionedFieldsTableBuilder from './SectionedFieldsTableBuilder'

// Definitions
import variant30 from '../../../test-app/mocks/mockClients/reports/mockVariants/report-templates/row-section'
import variant31 from '../../../test-app/mocks/mockClients/reports/mockVariants/report-templates/row-section-child'

// Data
import variant30Data from '../../../test-app/mocks/mockClients/reports/mockVariants/data/row-section'
import variant31Data from '../../../test-app/mocks/mockClients/reports/mockVariants/data/row-section-child'

describe('SectionedFieldsDataTableBuilder', () => {
  let rowSectionVariant: components['schemas']['VariantDefinition']
  let rowSectionChildVariant: components['schemas']['VariantDefinition']

  beforeEach(() => {
    rowSectionVariant = variant30 as unknown as components['schemas']['VariantDefinition']
    rowSectionChildVariant = variant31 as unknown as components['schemas']['VariantDefinition']
  })

  it('Sections added correctly', () => {
    const table = new SectionedFieldsTableBuilder(rowSectionVariant)
      .withHeaderOptions({
        columns: new Array(2),
        interactive: Boolean(rowSectionVariant.interactive),
      })
      .withChildData([])
      .buildTable(variant30Data)

    expect(table).toEqual({
      head: [],
      rows: [
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Section 1 title</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Field One', classes: 'dpr-row-heading' },
          { text: 'Value 1', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Field Two', classes: 'dpr-row-heading' },
          { text: 'Value 2', classes: 'dpr-row-heading-data' },
        ],
        [{ classes: 'dpr-section-header-spacer', colspan: 2, text: '' }],
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Second 2 title</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Field Three', classes: 'dpr-row-heading' },
          { text: 'Value 3', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Field Four', classes: 'dpr-row-heading' },
          { text: 'Value 4', classes: 'dpr-row-heading-data' },
        ],
        [{ classes: 'dpr-section-header-spacer', colspan: 2, text: '' }],
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Section 3 title</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Field Five', classes: 'dpr-row-heading' },
          { text: 'Value 5', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Field Six', classes: 'dpr-row-heading' },
          { text: 'Value 6', classes: 'dpr-row-heading-data' },
        ],
      ],
      rowCount: 1,
      colCount: 2,
    })
  })

  it('Sections and children added correctly', () => {
    const table = new SectionedFieldsTableBuilder(rowSectionChildVariant)
      .withHeaderOptions({
        columns: new Array(2),
        interactive: Boolean(rowSectionChildVariant.interactive),
      })
      .withChildData([
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: rowSectionChildVariant.childVariants![0].id,
          data: variant31Data.childData(),
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: rowSectionChildVariant.childVariants![1].id,
          data: variant31Data.childData2(),
        },
      ])
      .buildTable(variant31Data.parentData())

    expect(table).toEqual({
      head: [],
      rows: [
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Data columns as rows</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Field One', classes: 'dpr-row-heading' },
          { text: 'Value 1', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Field Two', classes: 'dpr-row-heading' },
          { text: 'Value 2', classes: 'dpr-row-heading-data' },
        ],
        [{ classes: 'dpr-section-header-spacer', colspan: 2, text: '' }],
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Child report</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Han Solo', classes: 'dpr-row-heading' },
          { text: 'Never tell me the odds.', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Master Yoda', classes: 'dpr-row-heading' },
          { text: 'Do or do not. There is no try', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Obi-wan Kenobi', classes: 'dpr-row-heading' },
          { text: 'Hello there', classes: 'dpr-row-heading-data' },
        ],
        [{ classes: 'dpr-section-header-spacer', colspan: 2, text: '' }],
        [{ classes: 'dpr-section-header', colspan: 2, html: '<h2 class="govuk-heading-m">Child report 2</h2>' }],
        [{ classes: 'dpr-section-header-spacer-bottom', colspan: 2, text: '' }],
        [
          { text: 'Homer Simpson', classes: 'dpr-row-heading' },
          { text: 'Doh!', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Mr Burns', classes: 'dpr-row-heading' },
          { text: 'Excellent!', classes: 'dpr-row-heading-data' },
        ],
        [
          { text: 'Ned Flanders', classes: 'dpr-row-heading' },
          { text: 'Hi-diddly-ho, neighborino', classes: 'dpr-row-heading-data' },
        ],
      ],
      rowCount: 1,
      colCount: 2,
    })
  })
})
