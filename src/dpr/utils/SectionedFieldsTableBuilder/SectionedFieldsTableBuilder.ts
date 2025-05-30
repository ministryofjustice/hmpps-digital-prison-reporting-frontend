import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable } from '../DataTableBuilder/types'
import type { Template } from '../../types/Templates'
import SectionedDataTableBuilder from '../SectionedDataTableBuilder/SectionedDataTableBuilder'

export default class SectionedFieldsDataTableBuilder extends SectionedDataTableBuilder {
  sectionedFields: components['schemas']['SectionedField'][]

  template: Template

  constructor(specification: components['schemas']['Specification']) {
    const { sectionedFields, template } = specification
    super(specification)

    this.sectionedFields = sectionedFields
    this.sections = this.sectionedFields.map((f) => f.name)
    this.template = template
  }

  initSectionedData(data: Array<Dict<string>>) {
    return data.flatMap((row) => {
      return this.sectionedFields
        .map((section) => {
          const sectionHeader = this.mapNamesToFields([section.name])[0]
          const fields = this.mapNamesToFields(section.fields)
          return {
            header: sectionHeader,
            fields,
          }
        })
        .map((section) => {
          return {
            header: section.header.display,
            fields: section.fields.map((f) => {
              return {
                heading: f.display,
                data: row[f.name],
              }
            }),
          }
        })
    })
  }

  createRows(data: Array<Dict<string>>): Cell[][] {
    const sectionedData = this.initSectionedData(data)

    return sectionedData.flatMap((section, index) => {
      const sectionHeaderRow = this.createSectionHeader(section.header, index)
      const sectionRows = section.fields.map((field) => {
        return [
          {
            text: field.heading,
            classes: 'dpr-row-heading',
          },
          {
            text: field.data,
            classes: 'dpr-row-heading-data',
          },
        ]
      })
      return [...sectionHeaderRow, ...sectionRows]
    })
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: [
        { text: '', classes: 'dpr-row-section-header' },
        { text: '', classes: 'pr-row-section-header-value' },
      ],
      rows: this.createRows(data),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
