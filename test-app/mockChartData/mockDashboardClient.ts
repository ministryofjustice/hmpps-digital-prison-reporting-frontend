export default class MockDashboardClient {
  dashboards: { id: string; metrics: { id: string }[] }[]

  constructor() {
    this.dashboards = [
      {
        id: 'dashboard1',
        metrics: [{ id: 'multi_chart-0' }, { id: 'multi_chart-2' }, { id: 'line-chart-2' }],
      },
      {
        id: 'dashboard2',
        metrics: [{ id: 'multi_chart-1' }, { id: 'multi_chart-0' }, { id: 'line-chart-0' }],
      },
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDefinition(tokenC: string, idC: string): Promise<{ id: string; metrics: { id: string }[] }> {
    return Promise.resolve(this.dashboards.find((d) => d.id === idC))
  }

  async getDefinitions() {
    Promise.resolve(this.dashboards)
  }
}
