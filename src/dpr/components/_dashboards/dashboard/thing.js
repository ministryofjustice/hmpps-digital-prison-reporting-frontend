const thing = {
  0: 'token',
  1: 'test-dashboard-8',
  2: 'test-report-1',
  name: 'Test Dashboard 8',
  description: 'Async Dashboard Testing',
  reportName: 'A Test Report',
  bookmarked: true,
  csrfToken: 'csrfToken',
  metrics: [
    {
      id: 'missing-ethnicity-metric',
      title: 'Missing ethnicity',
      description: 'Number of prisoners with missing ethnicity data',
      data: {
        chart: [
          {
            type: 'bar',
            unit: 'number',
            data: {
              labels: ['No. of Prisoners with ethnicity', 'No. of Prisoners with no ethnicity'],
              datasets: [
                { label: 'MDI', data: [845, 337], total: 1182 },
                { label: 'LTI', data: [1221, 0], total: 1221 },
                { label: 'SLI', data: [1055, 0], total: 1055 },
                { label: 'DAI', data: [634, 0], total: 634 },
              ],
            },
          },
          {
            type: 'doughnut',
            unit: 'percentage',
            data: {
              labels: ['Percentage of Prisoners with ethnicity', 'Percentage of Prisoners with no ethnicity'],
              datasets: [
                { label: 'MDI', data: [71, 29], total: 100 },
                { label: 'LTI', data: [100, 0], total: 100 },
                { label: 'SLI', data: [100, 0], total: 100 },
                { label: 'DAI', data: [100, 0], total: 100 },
              ],
            },
          },
        ],
        table: {
          head: [
            { text: 'Establishment ID' },
            { text: 'No. of Prisoners with ethnicity' },
            { text: 'No. of Prisoners with no ethnicity' },
            { text: 'Percentage of Prisoners with ethnicity' },
            { text: 'Percentage of Prisoners with no ethnicity' },
          ],
          rows: [
            [{ text: 'MDI' }, { text: 845 }, { text: 337 }, { text: 71 }, { text: 29 }],
            [{ text: 'LTI' }, { text: 1221 }, { text: 0 }, { text: 100 }, { text: 0 }],
            [{ text: 'SLI' }, { text: 1055 }, { text: 0 }, { text: 100 }, { text: 0 }],
            [{ text: 'DAI' }, { text: 634 }, { text: 0 }, { text: 100 }, { text: 0 }],
          ],
        },
      },
    },
    {
      id: 'missing-nationality-metric',
      title: 'Missing nationality',
      description: 'Number of prisoners with missing nationality data',
      data: {
        chart: [
          {
            type: 'bar',
            unit: 'number',
            data: {
              labels: ['No. of Prisoners with nationality', 'No. of Prisoners with no nationality'],
              datasets: [
                { label: 'MDI', data: [668, 514], total: 1182 },
                { label: 'LTI', data: [1216, 5], total: 1221 },
                { label: 'SLI', data: [1055, 0], total: 1055 },
                { label: 'DAI', data: [632, 2], total: 634 },
              ],
            },
          },
          {
            type: 'doughnut',
            unit: 'percentage',
            data: {
              labels: ['Percentage of Prisoners with nationality', 'Percentage of Prisoners with no nationality'],
              datasets: [
                { label: 'MDI', data: [57, 43], total: 100 },
                { label: 'LTI', data: [100, 0], total: 100 },
                { label: 'SLI', data: [100, 0], total: 100 },
                { label: 'DAI', data: [100, 0], total: 100 },
              ],
            },
          },
        ],
        table: {
          head: [
            { text: 'Establishment ID' },
            { text: 'No. of Prisoners with nationality' },
            { text: 'No. of Prisoners with no nationality' },
            { text: 'Percentage of Prisoners with nationality' },
            { text: 'Percentage of Prisoners with no nationality' },
          ],
          rows: [
            [{ text: 'MDI' }, { text: 668 }, { text: 514 }, { text: 57 }, { text: 43 }],
            [{ text: 'LTI' }, { text: 1216 }, { text: 5 }, { text: 100 }, { text: 0 }],
            [{ text: 'SLI' }, { text: 1055 }, { text: 0 }, { text: 100 }, { text: 0 }],
            [{ text: 'DAI' }, { text: 632 }, { text: 2 }, { text: 100 }, { text: 0 }],
          ],
        },
      },
    },
    {
      id: 'missing-religion-metric',
      title: 'Missing religion',
      description: 'Number of prisoners with missing religion data',
      data: {
        chart: [
          {
            type: 'bar',
            unit: 'number',
            data: {
              labels: ['No. of Prisoners with religion', 'No. of Prisoners with no religion'],
              datasets: [
                { label: 'MDI', data: [667, 515], total: 1182 },
                { label: 'LTI', data: [1216, 5], total: 1221 },
                { label: 'SLI', data: [1055, 0], total: 1055 },
                { label: 'DAI', data: [632, 2], total: 634 },
              ],
            },
          },
          {
            type: 'doughnut',
            unit: 'percentage',
            data: {
              labels: ['Percentage of Prisoners with religion', 'Percentage of Prisoners with no religion'],
              datasets: [
                { label: 'MDI', data: [56, 44], total: 100 },
                { label: 'LTI', data: [100, 0], total: 100 },
                { label: 'SLI', data: [100, 0], total: 100 },
                { label: 'DAI', data: [100, 0], total: 100 },
              ],
            },
          },
        ],
        table: {
          head: [
            { text: 'Establishment ID' },
            { text: 'No. of Prisoners with religion' },
            { text: 'No. of Prisoners with no religion' },
            { text: 'Percentage of Prisoners with religion' },
            { text: 'Percentage of Prisoners with no religion' },
          ],
          rows: [
            [{ text: 'MDI' }, { text: 667 }, { text: 515 }, { text: 56 }, { text: 44 }],
            [{ text: 'LTI' }, { text: 1216 }, { text: 5 }, { text: 100 }, { text: 0 }],
            [{ text: 'SLI' }, { text: 1055 }, { text: 0 }, { text: 100 }, { text: 0 }],
            [{ text: 'DAI' }, { text: 632 }, { text: 2 }, { text: 100 }, { text: 0 }],
          ],
        },
      },
    },
  ],
  filters: {
    filters: [
      {
        text: 'Establishment ID',
        name: 'establishment_id',
        type: 'Select',
        options: [
          { value: 'no-filter', text: 'Select your option', disabled: true, selected: true },
          { value: 'MDI', text: 'MDI' },
          { value: 'SLI', text: 'SLI' },
          { value: 'LTI', text: 'LTI' },
          { value: 'DAI', text: 'DAI' },
        ],
        value: null,
        minimumLength: null,
        dynamicResourceEndpoint: null,
        mandatory: false,
      },
    ],
    selectedFilters: [],
  },
  type: 'dashboard',
  actions: [
    {
      id: 'dpr-button-refresh',
      icon: 'refresh',
      disabled: false,
      tooltipText: 'Refresh',
      ariaLabelText: 'refresh report',
      href: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?',
    },
    {
      id: 'dpr-button-sharable',
      icon: 'share',
      disabled: false,
      tooltipText: 'Share',
      ariaLabelText: 'share report request via email',
      href: 'mailto:?subject=A Test Report-Test Dashboard 8&body=http%3A%2F%2Flocalhost%3A3010%2Fasync%2Fdashboard%2Ftest-report-1%2Ftest-dashboard-8%2Frequest%3F',
    },
    {
      id: 'dpr-button-copy',
      icon: 'copy',
      disabled: false,
      tooltipText: 'Copy',
      ariaLabelText: 'report request',
      href: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-8/request?',
    },
  ],
}
