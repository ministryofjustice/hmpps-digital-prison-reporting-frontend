import { AsyncReportData } from '../../types/AsyncReport'
import { components } from '../../types/api'

const BUTTON_TEMPLATES = {
  refresh: {
    id: 'dpr-button-refresh',
    icon: 'refresh',
    disabled: false,
    tooltipText: 'Refresh report',
    ariaLabelText: 'Refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    icon: 'print',
    disabled: false,
    tooltipText: 'Print report',
    ariaLabelText: 'Print report',
  },
  sharable: {
    id: 'dpr-button-sharable',
    icon: 'share',
    disabled: false,
    tooltipText: 'Share report request via email',
    ariaLabelText: 'Share report request via email',
  },
  copy: {
    id: 'dpr-button-copy',
    icon: 'copy',
    disabled: false,
    tooltipText: 'Copy report request',
    ariaLabelText: 'report request',
  },
  downloadable: {
    id: 'dpr-button-downloadable',
    icon: 'download',
    disabled: true,
    tooltipText: 'Download report',
    ariaLabelText: 'Download report',
  },
}

const initReportActions = (
  reportName: string,
  variantName: string,
  printable: boolean,
  url: string,
  executionId: string = null,
): ReportAction[] => {
  const actions: ReportAction[] = []

  // Refresh
  if (executionId) {
    actions.push({
      ...BUTTON_TEMPLATES.refresh,
      href: `${url}&refreshId=${executionId}`,
    })
  }

  // Print
  actions.push({
    ...BUTTON_TEMPLATES.printable,
    disabled: !printable,
  })

  // Share
  actions.push({
    ...BUTTON_TEMPLATES.sharable,
    href: `mailto:?subject=${reportName}-${variantName}&body=${encodeURIComponent(url)}`,
  })

  // Copy
  actions.push({
    ...BUTTON_TEMPLATES.copy,
    href: url,
  })

  // Downloadable
  actions.push(BUTTON_TEMPLATES.downloadable)

  return actions
}

export default {
  initAsyncReportActions: (variant: components['schemas']['VariantDefinition'], reportData: AsyncReportData) => {
    return initReportActions(
      reportData.reportName,
      reportData.name,
      variant.printable,
      reportData.url.request.fullUrl,
      reportData.executionId,
    )
  },

  initReportActions,
}

interface ReportAction {
  id: string
  icon: string
  disabled: boolean
  tooltipText: string
  ariaLabelText: string
  href?: string
}
