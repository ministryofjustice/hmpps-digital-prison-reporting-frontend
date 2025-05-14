const requestedUserListData = {
  head: {
    href: './async-reports/requested',
  },
  tableData: {
    rows: [
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 1</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-1/variantId-1/request/tblId_1724943092549/report\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 1</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2007</li><li class='govuk-body-s'>Field 3 end: 04-05-2010</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2007</li><li class='govuk-body-s'>Field 3 end: 04-05-2010</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Ready at: 29/08/2024, 15:51:41</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--green">FINISHED</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 2</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-2/variantId-2/request/exId_1721738244285\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 2</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Failed at: 23/10/2024, 15:00:35</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--red">FAILED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/test-report-2/variantId-2/request/exId_1721738244285">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1721738244285\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 3</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 3</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V1 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Expired at: 23/10/2024, 15:00:35</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--grey">EXPIRED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1721738244290\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 1</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1724943092549/report\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 1</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2007</li><li class='govuk-body-s'>Field 3 end: 04-05-2010</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2007</li><li class='govuk-body-s'>Field 3 end: 04-05-2010</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Ready at: 29/08/2024, 15:51:41</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--green">FINISHED</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 2</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/report/test-report-2/variantId-2/request/exId_1721738244285\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 2</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Failed at: 23/10/2024, 15:00:35</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--red">FAILED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/report/test-report-2/variantId-2/request/exId_1721738244285">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1721738244285\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 3</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 3</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>V2 requested variant. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Expired at: 23/10/2024, 15:00:35</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--grey">EXPIRED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1721738244290\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Dashboard 1</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<div class="dpr-show-more" data-content="Requested Dashboard. \n  " data-dpr-module="show-more" data-length="50">\n    <p class="govuk-body-s govuk-!-margin-bottom-0">\n      <div class=\'dpr-show-more-content\'>Requested Dashboard. \n  </div><a class="dpr-show-hide-button govuk-link--no-visited-state" href="#">show more</a>\n    </p>\n  </div>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    dashboard\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Requested at: 29/08/2024, 15:51:33</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag undefined">SUBMITTED</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Dashboard 2</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<div class="dpr-show-more" data-content="Requested Dashboard. \n  " data-dpr-module="show-more" data-length="50">\n    <p class="govuk-body-s govuk-!-margin-bottom-0">\n      <div class=\'dpr-show-more-content\'>Requested Dashboard. \n  </div><a class="dpr-show-hide-button govuk-link--no-visited-state" href="#">show more</a>\n    </p>\n  </div>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    dashboard\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Failed at: 23/10/2024, 15:00:35</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--red">FAILED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1724943092123\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Dashboard 3</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<div class="dpr-show-more" data-content="Requested Dashboard. \n  " data-dpr-module="show-more" data-length="50">\n    <p class="govuk-body-s govuk-!-margin-bottom-0">\n      <div class=\'dpr-show-more-content\'>Requested Dashboard. \n  </div><a class="dpr-show-hide-button govuk-link--no-visited-state" href="#">show more</a>\n    </p>\n  </div>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    dashboard\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Expired at: Invalid Date</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--grey">EXPIRED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?">Retry</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-requested-report-button"" href="#" data-execution-id=\'exId_1724943092824\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
    ],
    head: [
      {
        text: 'Product',
        classes: 'dpr-req-product-head',
      },
      {
        text: 'Name',
        classes: 'dpr-req-name-head',
      },
      {
        text: 'Description',
        classes: 'dpr-req-description-head',
      },
      {
        text: 'Type',
        classes: 'dpr-req-type-head',
      },
      {
        text: 'Date',
        classes: 'dpr-req-ts-head',
      },
      {
        text: 'Status',
        classes: 'dpr-req-status-head',
      },
    ],
  },
  total: {
    amount: 9,
    shown: 9,
    max: 10,
  },
  meta: [
    {
      reportId: 'test-report-1',
      id: 'variantId-1',
      executionId: 'exId_1724943092549',
      status: 'FINISHED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-2',
      id: 'variantId-2',
      executionId: 'exId_1721738244285',
      status: 'FAILED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-3',
      id: 'variantId-4',
      executionId: 'exId_1721738244290',
      status: 'EXPIRED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-1',
      id: 'variantId-1',
      executionId: 'exId_1724943092549',
      status: 'FINISHED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-2',
      id: 'variantId-2',
      executionId: 'exId_1721738244285',
      status: 'FAILED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-3',
      id: 'variantId-4',
      executionId: 'exId_1721738244290',
      status: 'EXPIRED',
      type: 'report',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-1',
      id: 'test-dashboard-1',
      executionId: 'exId_1724943092098',
      status: 'SUBMITTED',
      type: 'dashboard',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-1',
      id: 'test-dashboard-2',
      executionId: 'exId_1724943092123',
      status: 'FAILED',
      type: 'dashboard',
      dataProductDefinitionsPath: '',
    },
    {
      reportId: 'test-report-1',
      id: 'test-dashboard-3',
      executionId: 'exId_1724943092824',
      status: 'EXPIRED',
      type: 'dashboard',
      dataProductDefinitionsPath: '',
    },
  ],
  csrfToken: 'csrfToken',
  maxRows: 10,
}

module.exports = requestedUserListData
