import { AsyncSummary } from '../../../types/UserReports'
import { SummaryTemplate } from '../../../types/Templates'
import { ListSectionTableData } from '../ReportBuilder/types'
import { ParentChildTableData } from '../ParentChildDataBuilder/types'
import { DataTable } from '../../DataTableBuilder/types'

export interface SectionedData {
  sections: SectionData[]
}

export interface ReportTemplateData {
  rowCount: number
  summaries?: Record<string, DataTable[]>
  sections: SectionDataResult[]
}

export interface SectionSummary {
  template: SummaryTemplate
  data: ListSectionTableData // TODO: fix this
}

export interface SectionKey {
  name: string
  value: string
}

export interface SectionData {
  key?: string
  keyObj: SectionKey[]
  title?: string
  count: number
  summaries: AsyncSummary[]
  data: Array<Record<string, string>>
}

export interface SectionDataResult {
  title?: string
  count: number
  summaries: Record<string, DataTable[]>
  data: Array<Record<string, string>> | ParentChildTableData[] | ListSectionTableData
}
