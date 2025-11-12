import { components } from '../../../../../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUrlItemData } from '../../../../../types/UserReports'

export interface ReportUrls {
  reportUrl: string
  reportSearch?: string
  encodedSearch?: string
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
  executionId?: string
  requestedTimestamp?: string
  querySummary: Dict<string>[]
  queryData?: Dict<string | string[]>
  requestUrl?: AsyncReportUrlItemData
  defaultQuery?: string
  dataProductDefinitionsPath?: string
}
