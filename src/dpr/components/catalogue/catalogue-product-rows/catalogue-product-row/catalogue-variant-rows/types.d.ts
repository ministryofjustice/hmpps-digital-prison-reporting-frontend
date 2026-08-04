import { ReportType } from 'src/dpr/types/UserReports'

export type CatalogueVariantRow = {
  id: string
  heading: CatalogueRowHeading
  description: TruncationModel
  missing: boolean
  actions?: CatalogueVariantRowActions | undefined
}

type CatalogueVariantRowHeading = {
  name: string
  type: ReportType
}
