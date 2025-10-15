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
import SectionedFieldsDataTableBuilder from '../../../utils/SectionedFieldsTableBuilder/SectionedFieldsTableBuilder'
import { DataTable } from '../../../utils/DataTableBuilder/types'
import type { Template } from '../../../types/Templates'

const buildListTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable => {
  const { variant } = definition
  const { interactive, specification } = variant

  console.log(columns.value)

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

const buildRowSectionedTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  reportData: Dict<string>[],
  childData: ChildData[],
): DataTable[] => {
  const { variant } = definition
  const { interactive } = variant

  return reportData.map((rowData) => {
    return new SectionedFieldsDataTableBuilder(variant)
      .withHeaderOptions({
        columns: new Array(2),
        interactive,
      })
      .withChildData(childData)
      .buildTable([rowData])
  })
}

const createDataTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  childData: ChildData[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable[] => {
  let dataTables: DataTable[] = []
  const { template } = definition.variant.specification

  console.log('createDataTable', JSON.stringify({ columns }, null, 2))

  switch (template as Template) {
    case 'summary-section':
    case 'list-section': {
      const dataTable = buildSummarySectionTable(definition, columns, reportData, summariesData, reportQuery)
      dataTables.push(dataTable)
      break
    }

    case 'parent-child':
    case 'parent-child-section': {
      const dataTable = buildParentChildTable(definition, columns, reportData, childData)
      dataTables.push(dataTable)
      break
    }

    case 'list': {
      const dataTable = buildListTable(definition, columns, reportData, summariesData, reportQuery)
      dataTables.push(dataTable)
      break
    }

    case 'row-section-child':
    case 'row-section': {
      dataTables = buildRowSectionedTable(definition, reportData, childData)
      break
    }

    default: {
      const dataTable = buildListTable(definition, columns, reportData, summariesData, reportQuery)
      dataTables.push(dataTable)
      break
    }
  }

  return dataTables
}

export default {
  createDataTable,
}
