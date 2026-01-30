import { ActionTemplates } from './types'

// eslint-disable-next-line import/prefer-default-export
export const actionTemplates: ActionTemplates = {
  refresh: {
    id: 'dpr-button-refresh',
    disabled: false,
    text: 'Refresh',
    ariaLabelText: 'Refresh report',
  },
  printable: {
    id: 'dpr-button-printable',
    disabled: false,
    text: 'Print screen',
    ariaLabelText: 'Print screen',
  },
  sharable: {
    id: 'dpr-button-sharable',
    disabled: true,
    text: 'Email report link',
    ariaLabelText: 'Email report link',
  },
  copy: {
    id: 'dpr-button-copy',
    disabled: false,
    text: 'Copy report link',
    ariaLabelText: 'Copy report link',
  },
  downloadable: {
    id: 'dpr-button-downloadable',
    disabled: false,
    text: 'Download',
    ariaLabelText: 'download report',
  },
}
