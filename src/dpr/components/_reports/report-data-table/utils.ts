import { components } from '../../../types/api'
import Dict = NodeJS.Dict
import ReportQuery from '../../../types/ReportQuery'
import { AsyncSummary } from '../../../types/UserReports'
import CollatedSummaryBuilder from '../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import { Columns } from '../report-columns-form/types'
import { ChildData } from '../../../utils/ParentChildDataBuilder/types'
import ParentChildDataBuilder from '../../../utils/ParentChildDataBuilder/ParentChildDataBuilder'
import SectionedDataTableBuilder from '../../../utils/SectionedDataTableBuilder/SectionedDataTableBuilder'
import SectionedFieldsDataTableBuilder from '../../../utils/SectionedFieldsTableBuilder/SectionedFieldsTableBuilder'
import { DataTable } from '../../../utils/DataTableBuilder/types'
import type { Template } from '../../../types/Templates'
import { ReportTemplateData } from '../../../utils/SectionedDataBuilder/types'
import ListSectionDataBuilder from '../../../utils/ListSectionDataBuilder/ListSectionDataBuilder'

const validateDefinition = (definition: components['schemas']['SingleVariantReportDefinition']) => {
  const { variant } = definition
  const { specification } = variant

  if (!specification) {
    throw new Error('No specification in definition')
  }

  return { variant, specification }
}

const buildListTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable => {
  const { variant, specification } = validateDefinition(definition)
  const { interactive } = variant

  const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
  return new DataTableBuilder(specification.fields)
    .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
    .withHeaderOptions({
      columns: columns.value,
      reportQuery,
      interactive: Boolean(interactive),
    })
    .buildTable(reportData)
}

const buildListSectionReport = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Record<string, string>[],
  summariesData: AsyncSummary[],
): ReportTemplateData => {
  return new ListSectionDataBuilder(definition.variant, reportData, summariesData).withColumns(columns.value).build()
}

const buildParentChildReport = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Record<string, string>[],
  childData: ChildData[],
): ReportTemplateData => {
  return new ParentChildDataBuilder(definition.variant, reportData)
    .withParentColumns(columns.value)
    .withChildColumns([])
    .withChildData(childData)
    .build()
}

const buildSummarySectionTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable => {
  const { variant, specification } = validateDefinition(definition)
  const { interactive } = variant

  const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
  return new SectionedDataTableBuilder(specification)
    .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
    .withHeaderOptions({
      columns: columns.value,
      reportQuery,
      interactive: Boolean(interactive),
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
        interactive: Boolean(interactive),
      })
      .withChildData(childData)
      .buildTable([rowData])
  })
}

export const createDataTable = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  childData: ChildData[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): Array<DataTable | ReportTemplateData> => {
  let dataTables: Array<DataTable | ReportTemplateData> = []
  const { specification } = validateDefinition(definition)
  const { template } = specification

  switch (template as Template) {
    // case 'summary-section': {
    //   const dataTable = buildSummarySectionTable(definition, columns, reportData, summariesData, reportQuery)
    //   dataTables.push(dataTable)
    //   break
    // }

    case 'summary-section':
    case 'list-section': {
      const dataTable = buildListSectionReport(
        definition,
        columns,
        reportData as Record<string, string>[],
        summariesData,
      )
      dataTables.push(dataTable)
      break
    }

    case 'parent-child':
    case 'parent-child-section': {
      const dataTable = buildParentChildReport(definition, columns, reportData as Record<string, string>[], childData)
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
