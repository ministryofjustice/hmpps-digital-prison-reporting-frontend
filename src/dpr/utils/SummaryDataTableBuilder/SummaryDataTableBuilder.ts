import { AsyncSummary } from '../../types/UserReports'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { DataTable } from '../DataTableBuilder/types'

class SummaryDataTableBuilder extends DataTableBuilder {
  private summary: AsyncSummary

  constructor(summary: AsyncSummary, sections?: Array<string>) {
    const columns = summary.fields
      .filter((field) => !sections || !sections.includes(field.name))
      .map((field) => field.name)

    const fields = summary.fields.map((field) => ({
      ...field,
      calculated: false,
      sortable: false,
      defaultsort: false,
      mandatory: true,
      visible: true,
    }))

    super(fields, true)

    this.summary = summary
    this.columns = columns
  }

  buildSummaryTable(): DataTable {
    return super.buildTable(this.summary.data)
  }
}

export { SummaryDataTableBuilder }
export default SummaryDataTableBuilder
