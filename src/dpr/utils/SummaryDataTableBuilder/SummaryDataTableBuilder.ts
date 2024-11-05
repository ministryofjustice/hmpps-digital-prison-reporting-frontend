import Dict = NodeJS.Dict
import { AsyncSummary } from '../../types/UserReports'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { DataTable } from '../DataTableBuilder/types'

export default class SummaryDataTableBuilder extends DataTableBuilder {
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

    super(fields)

    this.summary = summary
    this.columns = columns
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    const sortedData = this.sort(data)
    return super.buildTable(sortedData)
  }

  buildSummaryTable(): DataTable {
    return this.buildTable(this.summary.data)
  }
}
