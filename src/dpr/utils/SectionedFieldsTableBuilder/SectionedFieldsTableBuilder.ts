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

  mapSection(data: Array<Dict<string>>) {
    const sectionHeadings = this.initSectionedHeadings(data)
    console.log(JSON.stringify(sectionHeadings, null, 2))
  }

  createRows(data: Array<Dict<string>>): Cell[][] {
    this.mapSection(data)
    return []
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: null,
      rows: this.createRows(data),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
