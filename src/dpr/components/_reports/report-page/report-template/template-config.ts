export interface TemplateConfig {
  pagination: boolean
  sort: boolean
  print: boolean
  totals: boolean
}

export const templateConfig: Record<string, TemplateConfig> = {
  list: {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
  'list-section': {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
  'parent-child': {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
  'parent-child-section': {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
  'summary-section': {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
  summary: {
    pagination: true,
    sort: true,
    print: true,
    totals: true,
  },
}
