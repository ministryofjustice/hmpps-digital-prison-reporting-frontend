import { Express } from "express"
import { RequestDataResult } from "../../../dist/dpr/types/AsyncReportUtils"
import { ReportType } from "../../../dist/dpr/types/UserReports"
import { DashboardVisualisationType } from "../../../dist/dpr/components/_dashboards/dashboard/types"

export const filtersRoutes = (app: Express) => {
  app.get('/asyncFiltersForm', (_, res) => {
    const templateData: RequestDataResult = {
      filtersData: {
        filters: [

        ],
        sortBy: [

        ]
      },
      filtersDescription: 'a description',
      reportData: {
        interactiveFilters: [

        ],
        reportName: 'good report',
        name: 'report name',
        description: 'a description',
        reportId: '123abc',
        id: '123-234',
        definitionPath: 'foo/bar',
        csrfToken: 'abc',
        template: '',
        sections: [{
          id: 'sectionID',
          visualisations: [{
            columns: {
              expectNulls: true,
              measures: [],
              filters: [],
              keys: [],
            },
            id: 'sectionvizid',
            type: DashboardVisualisationType.LIST,
            description: 'sectionvizdesc',
            display: 'sectionvizdisp',
            showLatest: true,
          }],
          description: 'sectiondesc',
          display: 'sectiondisp'
        }],
        type: ReportType.REPORT,
        defaultInteractiveQueryString: 'querystringgoeshere'
      },
      title: 'Async filter form'
    }
    res.render('routes/integrationTests/asyncFiltersForm.njk', {
      ...templateData,
      postEndpoint: '/dpr/requestReport/',
    })
  })
}