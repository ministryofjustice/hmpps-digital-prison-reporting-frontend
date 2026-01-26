import { components } from '../../../../types/api'
import Dict = NodeJS.Dict
import ReportQuery from '../../../../types/ReportQuery'
import { AsyncSummary } from '../../../../types/UserReports'
import CollatedSummaryBuilder from '../../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../../../../utils/DataTableBuilder/DataTableBuilder'
import { Columns } from '../../report-heading/report-columns/report-columns-form/types'
import { ChildData } from '../../../../utils/ParentChildDataBuilder/types'
import ParentChildDataBuilder from '../../../../utils/ParentChildDataBuilder/ParentChildDataBuilder'
import { DataTable } from '../../../../utils/DataTableBuilder/types'
import type { Template } from '../../../../types/Templates'
import { ReportTemplateData } from '../../../../utils/SectionedDataBuilder/types'
import ReportBuilder from '../../../../utils/ReportBuilder/ReportBuilder'
import { validateDefinition } from '../../../../utils/definitionUtils'

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

const buildReport = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Record<string, string>[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): ReportTemplateData => {
  return new ReportBuilder(definition.variant)
    .withData(reportData)
    .withSummaries(summariesData)
    .withColumns(columns.value)
    .withQuery(reportQuery)
    .build()
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

export const createReportTemplateData = (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  reportData: Dict<string>[],
  childData: ChildData[],
  summariesData: AsyncSummary[],
  reportQuery: ReportQuery,
): DataTable | ReportTemplateData => {
  const { specification } = validateDefinition(definition)
  const { template } = specification

  switch (template as Template) {
    case 'list':
    case 'summary-section':
    case 'summary':
    case 'list-section': {
      return buildReport(definition, columns, reportData as Record<string, string>[], summariesData, reportQuery)
    }

    case 'parent-child':
    case 'parent-child-section': {
      return buildParentChildReport(definition, columns, reportData as Record<string, string>[], childData)
    }

    default: {
      return buildListTable(definition, columns, reportData, summariesData, reportQuery)
    }
  }
}

export default {
  createReportTemplateData,
}
