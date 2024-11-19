import { ActionTemplates } from './types'

// eslint-disable-next-line import/prefer-default-export
export const actionTemplates: ActionTemplates = {
  refresh: {
    id: 'dpr-button-refresh',
    icon: 'refresh',
    disabled: false,
    tooltipText: 'Refresh',
    ariaLabelText: 'refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    icon: 'print',
    disabled: false,
    tooltipText: 'Print',
    ariaLabelText: 'print report',
  },
  sharable: {
    id: 'dpr-button-sharable',
    icon: 'share',
    disabled: false,
    tooltipText: 'Share',
    ariaLabelText: 'share report request via email',
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
    ariaLabelText: 'download report',
  },
}
