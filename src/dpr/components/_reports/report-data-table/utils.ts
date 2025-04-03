import { components } from '../../../types/api'
import Dict = NodeJS.Dict
import ReportQuery from '../../../types/ReportQuery'
import { AsyncSummary } from '../../../types/UserReports'
import CollatedSummaryBuilder from '../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import { Columns } from '../report-columns-form/types'
import { ChildData } from '../../../utils/ParentChildDataTableBuilder/types'
import ParentChildDataTableBuilder from '../../../utils/ParentChildDataTableBuilder/ParentChildDataTableBuilder'
import SectionedDataTableBuilder from '../../../utils/SectionedDataTableBuilder/SectionedDataTableBuilder'
import { DataTable } from '../../../utils/DataTableBuilder/types'

const buildListTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable => {
  const { variant } = definition
  const { interactive, specification } = variant

  const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
  return new DataTableBuilder(specification.fields)
    .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
    .withHeaderOptions({
      columns: columns.value,
      reportQuery,
      interactive,
    })
    .buildTable(reportData)
}

const buildParentChildTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  childData: ChildData[],
): DataTable => {
  return new ParentChildDataTableBuilder(definition.variant)
    .withNoHeaderOptions(columns.value)
    .withChildData(childData)
    .buildTable(reportData)
}

const buildSummarySectionTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable => {
  const { variant } = definition
  const { interactive, specification } = variant

  const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
  return new SectionedDataTableBuilder(specification)
    .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
    .withHeaderOptions({
      columns: columns.value,
      reportQuery,
      interactive,
    })
    .buildTable(reportData)
}

export default {
  buildListTable,
  buildParentChildTable,
  buildSummarySectionTable,
}
