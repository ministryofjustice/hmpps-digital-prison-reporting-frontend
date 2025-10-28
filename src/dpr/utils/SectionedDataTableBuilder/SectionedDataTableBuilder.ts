import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable } from '../DataTableBuilder/types'
import type { SummaryTemplate, Template } from '../../types/Templates'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { distinct } from '../arrayUtils'
import SummaryDataTableBuilder from '../SummaryDataTableBuilder/SummaryDataTableBuilder'
import { SectionSortKey } from './types'

class SectionedDataTableBuilder extends DataTableBuilder {
  sections: Array<string>

  template: Template

  constructor(specification: components['schemas']['Specification']) {
    const { fields, sections, template } = specification
    super(fields)
    this.sections = sections
    this.template = template
  }

  /**
   * Creates the section heading strings
   *
   * @param {Dict<string>[]} data
   * @param {FieldDefinition[]} sectionFields
   * @return {*}  {string[]} array of section headings
   */
  private createSectionHeadings(
    data: Dict<string>[],
    sectionFields: components['schemas']['FieldDefinition'][],
  ): string[] {
    return data
      .map(
        (rowData): SectionSortKey => ({
          description: this.mapSectionDescription(rowData),
          sortKey: this.getSortKey(rowData, sectionFields),
        }),
      )
      .sort(this.sortKeyComparison())
      .map((s) => s.description)
      .reduce(distinct, [])
  }

  /**
   * Initialise section heading arrays
   *
   * @private
   * @param {string[]} sectionDescriptions
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  initSectionData(sectionDescriptions: string[]) {
    const sectionedData: Dict<Cell[][]> | Dict<Array<Dict<string>>> = {}
    sectionDescriptions.forEach((sectionDescription) => {
      sectionedData[sectionDescription] = []
    })
    return sectionedData
  }

  /**
   * Maps the rows to the correct section
   *
   * @private
   * @param {Array<Dict<string>>} data
   * @param {Dict<Cell[][]>} sectionedData
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  private mapRowsToSection(data: Array<Dict<string>>, sectionedData: Dict<Cell[][]>) {
    return data.reduce((previousValue, rowData) => {
      const sectionDescription: string = this.mapSectionDescription(rowData)
      const mappedData = this.mapRow(rowData)
      const previousValueDescription = previousValue[sectionDescription]

      return {
        ...previousValue,
        ...(previousValueDescription && {
          [sectionDescription]: previousValueDescription.concat([mappedData]),
        }),
      }
    }, sectionedData)
  }

  /**
   * Maps the rows to the correct section
   *
   * @private
   * @param {Array<Dict<string>>} data
   * @param {Dict<Cell[][]>} sectionedData
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  private mapDataToSection(data: Array<Dict<string>>, sectionedData: Dict<Array<Dict<string>>>) {
    return data.reduce((previousValue, rowData) => {
      const sectionDescription: string = this.mapSectionDescription(rowData)
      const previousValueDescription = previousValue[sectionDescription]
      const section = {
        ...previousValue,
        ...(previousValueDescription && {
          [sectionDescription]: previousValueDescription.concat([rowData]),
        }),
      }
      return section
    }, sectionedData)
  }

  /**
   * Gets the counts for rows in section
   *
   * @param {Dict<Cell[][]>} sectionedData
   * @param {string} sectionDescription
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  getSectionCount(sectionedData: Dict<Cell[][]> | Dict<Dict<string>[]>, sectionDescription: string) {
    const count = sectionedData[sectionDescription] ? sectionedData[sectionDescription].length : 0
    const countDescription = `${count} result${count === 1 ? '' : 's'}`

    return {
      count,
      countDescription,
    }
  }

  /**
   * Creates the summaries and builds the table with summaries
   *
   * @private
   * @param {string} sectionDescription
   * @param {Cell[][]} mappedTableData
   * @param {Cell[]} header
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  private mapSummariesAndCreateTable(sectionDescription: string, mappedTableData: Cell[][], header: Cell[]) {
    let tableContent: Cell[][] = []

    let mappedSectionHeaderSummary: Cell[][] = []
    let mappedHeaderSummary: Cell[][] = []
    let mappedFooterSummary: Cell[][] = []
    let mappedSectionFooterSummary: Cell[][] = []

    mappedSectionHeaderSummary = this.mapSectionSummaryTables(sectionDescription, 'section-header', this.columns.length)
    mappedHeaderSummary = this.mapSectionSummaryRows('table-header', sectionDescription)
    mappedFooterSummary = this.mapSectionSummaryRows('table-footer', sectionDescription)
    mappedSectionFooterSummary = this.mapSectionSummaryTables(sectionDescription, 'section-footer', this.columns.length)

    tableContent = mappedSectionHeaderSummary
      .concat(mappedTableData.length > 0 ? [header] : [])
      .concat(mappedHeaderSummary)
      .concat(mappedTableData)
      .concat(mappedFooterSummary)
      .concat(mappedSectionFooterSummary)

    return tableContent
  }

  /**
   * Creates the table data
   * - if summaries are present, includes the summaries data
   *
   * @private
   * @param {string[]} sectionDescriptions
   * @param {Dict<Cell[][]>} sectionedData
   * @param {Cell[]} header
   * @return {*}
   * @memberof SectionedDataTableBuilder
   */
  private createTableContent(sectionDescriptions: string[], sectionedData: Dict<Cell[][]>, header: Cell[]) {
    return sectionDescriptions.flatMap((sectionDescription, index) => {
      const { count, countDescription } = this.getSectionCount(sectionedData, sectionDescription)
      const mappedTableData = sectionedData[sectionDescription]

      let tableContent: Cell[][] = []
      if (mappedTableData) {
        if (Object.keys(this.reportSummaries).length) {
          tableContent = this.mapSummariesAndCreateTable(sectionDescription, mappedTableData, header)
        } else {
          tableContent = tableContent.concat(mappedTableData.length > 0 ? [header] : []).concat(mappedTableData)
        }
      }

      const sectionHeader = this.createSectionHeader(sectionDescription, index, count, countDescription)

      return [...sectionHeader, ...tableContent]
    })
  }

  createSectionHeader(sectionDescription: string, index: number, count?: number, countDescription?: string) {
    const header = []
    if (index !== 0) {
      header.push([
        {
          classes: 'dpr-section-header-spacer',
          colspan: this.columns.length,
          text: '',
        },
      ])
    }
    header.push([
      {
        classes: 'dpr-section-header',
        colspan: this.columns.length,
        html: `<h2 class="govuk-heading-m">${sectionDescription}${
          count && count > 0 ? ` <span class='govuk-caption-m'>${countDescription}</span>` : ''
        }</h2>`,
      },
    ])
    header.push([
      {
        classes: 'dpr-section-header-spacer-bottom',
        colspan: this.columns.length,
        text: '',
      },
    ])
    return header
  }

  private mapSectionSummaryRows(template: SummaryTemplate, sectionDescription: string): Cell[][] {
    if (this.reportSummaries[template]) {
      return this.reportSummaries[template].flatMap((reportSummary) =>
        reportSummary.data
          .filter((rowData) => this.mapSectionDescription(rowData) === sectionDescription)
          .map((rowData) =>
            this.mapRow(rowData, `dpr-report-summary-cell dpr-report-summary-cell-${template}`, reportSummary.fields),
          ),
      )
    }
    return []
  }

  private mapSectionSummaryTables(
    sectionDescription: string,
    summaryTemplate: SummaryTemplate,
    columnsLength: number,
  ): Cell[][] {
    const summaries = this.reportSummaries[summaryTemplate]
    if (summaries) {
      const htmlTables = summaries.map((summary) => {
        const data = summary.data.filter((row) => this.mapSectionDescription(row) === sectionDescription)

        if (data.length > 0) {
          const dataTable = new SummaryDataTableBuilder(summary, this.sections).buildTable(data)

          const htmlTable = this.convertDataTableToHtml(dataTable)

          return `<div class='dpr-summary-container'>${htmlTable}</div>`
        }
        return ''
      })

      const summaryContent = htmlTables.join('')
      if (summaryContent.length > 0) {
        return [
          [
            {
              classes: 'dpr-summary-cell',
              colspan: columnsLength,
              html: `<div class='dpr-summary-container-group dpr-summary-container-group-${summaryTemplate}'>${summaryContent}</div>`,
            },
          ],
        ]
      }
    }
    return []
  }

  mapSectionDescription(rowData: NodeJS.Dict<string>): string {
    const { sections } = this

    return this.mapNamesToFields(sections)
      .map((s) => `${s.display}: ${this.mapCellValue(s, rowData[s.name])}`)
      .join(', ')
  }

  mapSections(data: Array<Dict<string>>) {
    const sectionHeadings = this.initSectionedHeadings(data)
    let { sectionedData } = sectionHeadings

    // Maps data to sections
    if (this.template !== 'summary-section') {
      if (this.template === 'parent-child-section') {
        sectionedData = this.mapDataToSection(data, sectionedData as Dict<Dict<string>[]>)
      } else {
        sectionedData = this.mapRowsToSection(data, sectionedData as Dict<Cell[][]>)
      }
    }

    return {
      sectionDescriptions: sectionHeadings.sectionDescriptions,
      sectionedData,
    }
  }

  initSectionedHeadings(data: Array<Dict<string>>) {
    // Get the section definition data
    const sectionFields = this.mapNamesToFields(this.sections)
    // create the sectionHeadings
    const sectionDescriptions = this.createSectionHeadings(data, sectionFields)
    // init empty sections
    const sectionedData = this.initSectionData(sectionDescriptions)

    return {
      sectionDescriptions,
      sectionedData,
    }
  }

  /**
   * Creates the table rows.
   *
   * @private
   * @param {Array<Dict<string>>} data
   * @param {Cell[]} header
   * @return {*}  {Cell[][]}
   * @memberof SectionedDataTableBuilder
   */
  private mapSectionedData(data: Array<Dict<string>>, header: Cell[]): Cell[][] {
    const { sectionDescriptions, sectionedData } = this.mapSections(data)
    // Create the table
    const tableContent = this.createTableContent(sectionDescriptions, sectionedData as Dict<Cell[][]>, header)

    return tableContent
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: null,
      rows: this.mapSectionedData(data, this.mapHeader(true, 'govuk-table__header')),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}

export { SectionedDataTableBuilder }
export default SectionedDataTableBuilder
