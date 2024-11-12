import { ReportType, RequestedReport } from '../../types/UserReports'
import { components } from '../../types/api'

const BUTTON_TEMPLATES = {
  refresh: {
    id: 'dpr-button-refresh',
    icon: 'refresh',
    disabled: false,
    tooltipText: 'refresh',
    ariaLabelText: 'refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    icon: 'print',
    disabled: false,
    tooltipText: 'print',
    ariaLabelText: 'print report',
  },
  sharable: {
    id: 'dpr-button-sharable',
    icon: 'share',
    disabled: false,
    tooltipText: 'share',
    ariaLabelText: 'share report request via email',
  },
  copy: {
    id: 'dpr-button-copy',
    icon: 'copy',
    disabled: false,
    tooltipText: 'copy',
    ariaLabelText: 'report request',
  },
  downloadable: {
    id: 'dpr-button-downloadable',
    icon: 'download',
    disabled: false,
    tooltipText: 'download',
    ariaLabelText: 'download report',
  },
}

const initReportActions = ({
  reportName,
  name,
  printable,
  url,
  executionId = null,
  downloadable = true,
}: {
  reportName: string
  name: string
  printable: boolean
  url: string
  executionId?: string
  downloadable?: boolean
}): ReportAction[] => {
  const actions: ReportAction[] = []

  // Refresh
  if (executionId) {
    actions.push({
      ...BUTTON_TEMPLATES.refresh,
      href: url,
    })
  }

  // Print
  actions.push({
    ...BUTTON_TEMPLATES.printable,
    disabled: !printable,
    href: '#',
    ariaLabelText: !printable
      ? `${BUTTON_TEMPLATES.printable.ariaLabelText}, disabled`
      : BUTTON_TEMPLATES.printable.ariaLabelText,
  })

  // Share
  actions.push({
    ...BUTTON_TEMPLATES.sharable,
    href: `mailto:?subject=${reportName}-${name}&body=${encodeURIComponent(url)}`,
  })

  // Copy
  actions.push({
    ...BUTTON_TEMPLATES.copy,
    href: url,
  })

  // Downloadable
  actions.push({
    ...BUTTON_TEMPLATES.downloadable,
    disabled: !downloadable,
    ariaLabelText: !downloadable
      ? `${BUTTON_TEMPLATES.downloadable.ariaLabelText}, disabled`
      : BUTTON_TEMPLATES.downloadable.ariaLabelText,
  })

  return actions
}

const getActions = ({
  refresh,
  print,
  share,
  copy,
  download,
}: {
  refresh?: {
    url: string
    executionId: string
  }
  print?: {
    enabled: boolean
  }
  copy?: { url: string }
  share?: {
    reportName: string
    name: string
    url: string
  }
  download?: {
    enabled: boolean
    csrfToken: string
    reportId: string
    reportName: string
    name: string
    id: string
    tableId: string
    columns: string[]
    type: ReportType
    definitionPath: string
  }
}): ReportAction[] => {
  const actions: ReportAction[] = []

  // Refresh
  if (refresh && refresh.url && refresh.executionId) {
    actions.push({
      ...BUTTON_TEMPLATES.refresh,
      href: refresh.url,
    })
  }

  // Print
  if (print) {
    actions.push({
      ...BUTTON_TEMPLATES.printable,
      disabled: !print.enabled,
      href: '#',
      ariaLabelText: !print.enabled
        ? `${BUTTON_TEMPLATES.printable.ariaLabelText}, disabled`
        : BUTTON_TEMPLATES.printable.ariaLabelText,
    })
  }

  // Share
  if (share) {
    actions.push({
      ...BUTTON_TEMPLATES.sharable,
      href: `mailto:?subject=${share.reportName}-${share.name}&body=${encodeURIComponent(share.url)}`,
    })
  }

  // Copy
  if (copy) {
    actions.push({
      ...BUTTON_TEMPLATES.copy,
      href: copy.url,
    })
  }

  if (download) {
    actions.push({
      ...BUTTON_TEMPLATES.downloadable,
      disabled: !download.enabled,
      attributes: {
        reportId: download.reportId,
        csrfToken: download.csrfToken,
        id: download.id,
        tableId: download.tableId,
        type: download.type,
        reportName: download.reportName,
        name: download.name,
        columns: download.columns,
        definitionPath: download.definitionPath,
      },
      ariaLabelText: !download.enabled
        ? `${BUTTON_TEMPLATES.downloadable.ariaLabelText}, disabled`
        : BUTTON_TEMPLATES.downloadable.ariaLabelText,
    })
  }

  return actions
}

export default {
  initAsyncReportActions: (variant: components['schemas']['VariantDefinition'], reportData: RequestedReport) => {
    return initReportActions({
      reportName: reportData.reportName,
      name: reportData.name,
      printable: variant.printable,
      url: reportData.url.request.fullUrl,
      executionId: reportData.executionId,
    })
  },

  initReportActions,
  getActions,
}

interface ReportAction {
  id: string
  icon: string
  disabled: boolean
  tooltipText: string
  ariaLabelText: string
  href?: string
  attributes?: {
    reportId?: string
    id?: string
    csrfToken?: string
    tableId?: string
    type?: ReportType
    reportName?: string
    name?: string
    columns: string[]
    definitionPath: string
  }
}
