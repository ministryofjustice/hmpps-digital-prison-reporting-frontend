// @ts-nocheck
const scheduledReport = {
  id: 'scheduled-report-example',
  name: 'Scheduled Report',
  description: 'This is a scheduled report and can be subscribed to',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  schedule: 'Weekly at 9:00am',
  scheduled: true,
  specification: {
    template: 'list',
    sections: [],
    fields: [
      {
        name: 'field1',
        display: 'Field 1',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
        calculated: false,
        header: false,
        wordWrap: 'none',
      },
      {
        name: 'field2',
        display: 'Field 2',
        sortable: false,
        type: 'string',
        mandatory: true,
        visible: true,
        calculated: false,
        header: false,
        defaultsort: false,
        wordWrap: 'none',
      },
      {
        name: 'field3',
        display: 'Field 3',
        sortable: false,
        visible: true,
        type: 'date',
        mandatory: false,
        calculated: false,
        header: false,
        defaultsort: false,
        wordWrap: 'none',
      },
    ]
  },
}

module.exports = scheduledReport
