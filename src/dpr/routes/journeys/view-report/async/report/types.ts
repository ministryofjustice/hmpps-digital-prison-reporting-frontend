import { components } from '../../../../../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUrlItemData } from '../../../../../types/UserReports'
import { QuerySummaryItem } from '../../../../../components/_async/request-details/types'

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
  printable: boolean
  fields: components['schemas']['FieldDefinition'][]
  schedule?: string | undefined

  // Report specfic
  classification?: string | undefined
  template?: string
  specification?: components['schemas']['Specification']
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
