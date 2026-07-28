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
  // Excel first: it is what most report users open downloads with, and unlike csv it does
  // not let Excel reinterpret values such as room numbers as dates.
  downloadableXlsx: {
    id: 'dpr-button-downloadable-xlsx',
    disabled: false,
    text: 'Download Excel',
    ariaLabelText: 'Download report as Excel',
  },
  downloadableCsv: {
    id: 'dpr-button-downloadable-csv',
    disabled: false,
    text: 'Download CSV',
    ariaLabelText: 'Download report as CSV',
  },
  // Shown in place of the format buttons while downloading is still gated behind the
  // feedback request form.
  downloadable: {
    id: 'dpr-button-downloadable',
    disabled: false,
    text: 'Download',
    ariaLabelText: 'Download report',
  },
}
