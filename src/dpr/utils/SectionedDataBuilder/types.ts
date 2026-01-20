import { AsyncSummary } from '../../types/UserReports'
import { SummaryTemplate } from '../../types/Templates'
import { ListSectionTableData } from '../ListSectionDataBuilder/types'
import { ParentChildTableData } from '../ParentChildDataBuilder/types'

export interface SectionedData {
  sections: SectionData[]
}

export interface ReportTemplateData {
  rowCount: number
  sections: SectionDataResult[]
}

export interface SectionSummary {
  template: SummaryTemplate
  data: ListSectionTableData // TODO: fix this
}

export interface SectionData {
  key?: string
  title?: string
  count: number
  summaries: AsyncSummary[]
  data: Array<Record<string, string>>
}

export interface SectionDataResult {
  title?: string
  count: number
  summaries: AsyncSummary[]
  data: Array<Record<string, string>> | ParentChildTableData[] | ListSectionTableData
}
