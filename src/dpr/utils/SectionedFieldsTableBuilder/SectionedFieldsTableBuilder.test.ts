import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { DataTable } from '../DataTableBuilder/types'
import type { Template } from '../../types/Templates'
import SectionedDataTableBuilder from '../SectionedDataTableBuilder/SectionedDataTableBuilder'

export default class SectionedFieldsDataTableBuilder extends SectionedDataTableBuilder {
  sections: Array<string>

  template: Template

  constructor(specification: components['schemas']['Specification']) {
    const { sections, template } = specification
    super(specification)
    this.sections = sections
    this.template = template
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: null,
      rows: [],
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
