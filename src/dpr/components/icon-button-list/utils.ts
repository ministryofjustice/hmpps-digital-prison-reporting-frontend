import { AsyncReportData } from '../../types/AsyncReport'
import { components } from '../../types/api'
import Dict = NodeJS.Dict

const FULL_BUTTON_LIST = [
  {
    id: 'refresh',
    icon: 'refresh',
    disabled: false,
    tooltipText: 'Refresh report',
    ariaLabelText: 'Print report',
  },
  {
    id: 'printable',
    icon: 'print',
    disabled: true,
    tooltipText: 'Print report',
    ariaLabelText: 'Print report',
  },
  {
    id: 'sharable',
    icon: 'share',
    disabled: true,
    tooltipText: 'Share report request via email',
    ariaLabelText: 'Share report request via email',
  },
  {
    id: 'copy',
    icon: 'copy',
    disabled: true,
    tooltipText: 'Copy report request',
    ariaLabelText: 'report request',
  },
  {
    id: 'downloadable',
    icon: 'download',
    disabled: true,
    tooltipText: 'Download report',
    ariaLabelText: 'Download report',
  },
]

/**
 * Sets the buttons to enabled/disabled
 *
 * @param {string[]} actions
 * @return {*}
 */
const filterButtonList = (actions: ReportAction[]) => {
  return FULL_BUTTON_LIST.map((button) => {
    const action = actions.find((a: ReportAction) => a.type === button.id)
    return {
      ...button,
      disabled: !action,
      ...(action && action.data && { ...action.data }),
    }
  })
}

export default {
  initReportActions: (variant: components['schemas']['VariantDefinition'], reportData: AsyncReportData) => {
    const actions: ReportAction[] = []

    actions.push({
      type: 'refresh',
      data: {
        href: reportData.url.request.fullUrl,
      },
    })

    // PRINT
    if (variant.printable) actions.push({ type: 'printable' })

    // SHARE
    actions.push({
      type: 'sharable',
      data: {
        href: `mailto:?subject=${reportData.reportName}-${reportData.name}&body=${encodeURIComponent(
          reportData.url.request.fullUrl,
        )}`,
      },
    })

    // Copy
    actions.push({
      type: 'copy',
      data: {
        href: reportData.url.request.fullUrl,
      },
    })

    const buttons = filterButtonList(actions)
    return buttons
  },
}

interface ReportAction {
  type: string
  data?: Dict<string>
}
