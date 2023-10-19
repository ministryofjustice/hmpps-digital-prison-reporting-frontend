import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'

app.get('/', (req, res, next) => {
  ReportListUtils.renderList({
    title: 'Test app',
    fields: [
      {
        name: "name",
        displayName: "Name",
        sortable: true,
        defaultSortColumn: false,
        type: "String"
      },
      {
        name: "location",
        displayName: "Location",
        sortable: true,
        defaultSortColumn: false,
        type: "String"
      },
      {
        name: "total",
        displayName: "Total",
        sortable: true,
        defaultSortColumn: false,
        type: "Long"
      }
    ],
    request: req,
    response: res,
    next,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      exampleOption: true,
    },
    layoutTemplate: 'page.njk',
  })
})