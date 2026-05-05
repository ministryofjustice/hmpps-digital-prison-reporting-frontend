import { components } from '../../../../../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUrlItemData } from '../../../../../types/UserReports'
import { QuerySummaryItem } from 'src/dpr/components/_async/request-details/types'

export interface ReportUrls {
  reportUrl: string
  reportSearch?: string | undefined
  encodedSearch?: string | undefined
  pathname: string
}

export interface ExtractedDefinitionData {
  reportName: string
  name: string
  description: string | undefined
  classification: string | undefined
  printable: boolean
  specification: components['schemas']['Specification']
  template: string
  fields: components['schemas']['FieldDefinition'][]
}

export interface ExtractedRequestData {
  executionId?: string | undefined
  requestedTimestamp?: string | undefined
  querySummary: QuerySummaryItem[]
  queryData?: Dict<string | string[]> | undefined
  requestUrl?: AsyncReportUrlItemData | undefined
  defaultQuery?: string | undefined
  dataProductDefinitionsPath?: string | undefined
}
