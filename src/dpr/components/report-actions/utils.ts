import { AsyncReportData } from '../../types/AsyncReport'
import { components } from '../../types/api'

const BUTTON_TEMPLATES = {
  refresh: {
    id: 'dpr-button-refresh',
    icon: 'refresh',
    disabled: false,
    tooltipText: 'Refresh',
    ariaLabelText: 'Refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    icon: 'print',
    disabled: false,
    tooltipText: 'Print',
    ariaLabelText: 'Print report',
  },
  sharable: {
    id: 'dpr-button-sharable',
    icon: 'share',
    disabled: false,
    tooltipText: 'Share',
    ariaLabelText: 'Share report request via email',
  },
  copy: {
    id: 'dpr-button-copy',
    icon: 'copy',
    disabled: false,
    tooltipText: 'Copy',
    ariaLabelText: 'report request',
  },
  downloadable: {
    id: 'dpr-button-downloadable',
    icon: 'download',
    disabled: false,
    tooltipText: 'Download',
    ariaLabelText: 'Download report',
  },
}

const initReportActions = ({
  reportName,
  variantName,
  printable,
  url,
  executionId = null,
  downloadable = true,
}: {
  reportName: string
  variantName: string
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
    // disabled: !printable,
    disabled: false,
    href: '#',
    ariaLabelText: !printable
      ? `${BUTTON_TEMPLATES.printable.ariaLabelText}, disabled`
      : BUTTON_TEMPLATES.printable.ariaLabelText,
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
  actions.push({
    ...BUTTON_TEMPLATES.downloadable,
    disabled: !downloadable,
    ariaLabelText: !downloadable
      ? `${BUTTON_TEMPLATES.downloadable.ariaLabelText}, disabled`
      : BUTTON_TEMPLATES.downloadable.ariaLabelText,
  })

  return actions
}

export default {
  initAsyncReportActions: (variant: components['schemas']['VariantDefinition'], reportData: AsyncReportData) => {
    return initReportActions({
      reportName: reportData.reportName,
      variantName: reportData.name,
      printable: variant.printable,
      url: reportData.url.request.fullUrl,
      executionId: reportData.executionId,
    })
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
