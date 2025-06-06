import { ActionTemplates } from './types'

// eslint-disable-next-line import/prefer-default-export
export const actionTemplates: ActionTemplates = {
  refresh: {
    id: 'dpr-button-refresh',
    disabled: false,
    tooltipText: 'Refresh',
    ariaLabelText: 'refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    disabled: false,
    tooltipText: 'Print screen',
    ariaLabelText: 'print report',
  },
  sharable: {
    id: 'dpr-button-sharable',
    disabled: false,
    tooltipText: 'Email report link',
    ariaLabelText: 'share report request via email',
  },
  copy: {
    id: 'dpr-button-copy',
    disabled: false,
    tooltipText: 'Copy report link',
    ariaLabelText: 'report request',
  },
  downloadable: {
    id: 'dpr-button-downloadable',
    disabled: false,
    tooltipText: 'Download',
    ariaLabelText: 'download report',
  },
}
