const mockViewedUserListRenderData = {
  head: {
    href: './async-reports/viewed',
  },
  tableData: {
    rows: [
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-1/variantId-1/request/tblId_1721738244284/report\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 1</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Last viewed: 23/07/2024, 13:48:37</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--green">READY</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 2</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 2</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Expired at: 23/07/2024, 13:48:37</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--grey">EXPIRED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true">Refresh</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-viewed-report-button"" href="#" data-execution-id=\'exId_1721738907386\'>Remove</a>\n    </div>',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 3</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/test-report-3/variantId-3/request/tblId_1721738907388/report\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 3</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"Test Variant 3 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>Test Variant 3 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Last viewed: 23/07/2024, 13:48:37</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--green">READY</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1721738244284/report\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 1</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Last viewed: 23/07/2024, 13:48:37</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--green">READY</strong> ',
          classes: 'dpr-req-cell dpr-req-cell__status',
        },
      ],
      [
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Test Report 2</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<a href=\'http://localhost:3010/async/report/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true\'><p class="govuk-body-s govuk-!-margin-bottom-0">Test Variant 2</p></a>',
          classes: 'dpr-req-cell',
        },
        {
          html: "<div class=\"dpr-show-more\" data-content=\"Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul>\" data-dpr-module=\"show-more\" data-length=\"50\">\n    <p class=\"govuk-body-s govuk-!-margin-bottom-0\">\n      <div class='dpr-show-more-content'>Test Variant 2 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed Test Variant 1 description - this will succeed. \n  <ul class='dpr-card-group__item__filters-list govuk-!-margin-top-3'><li class='govuk-body-s'>Field 1: value1.2</li><li class='govuk-body-s'>Field 2: value2.1</li><li class='govuk-body-s'>Field 3 start: 01-02-2003</li><li class='govuk-body-s'>Field 3 end: 04-05-2006</li><li class='govuk-body-s'>Field 7: 01-02-2005</li><li class='govuk-body-s'>Sort Column: Field 1</li><li class='govuk-body-s'>Sort Direction: Ascending</li></ul></div><a class=\"dpr-show-hide-button govuk-link--no-visited-state\" href=\"#\">show more</a>\n    </p>\n  </div>",
          classes: 'dpr-req-cell',
        },
        {
          html: '<p class="govuk-body dpr-tag undefined">\n    report\n  </p>',
          classes: 'dpr-req-cell dpr-req-cell__type',
        },
        {
          html: '<p class="govuk-body-s govuk-!-margin-bottom-0">Expired at: 23/07/2024, 13:48:37</p>',
          classes: 'dpr-req-cell',
        },
        {
          html: '<strong class="govuk-tag dpr-request-status-tag govuk-tag--grey">EXPIRED</strong> <div class="dpr-icon-wrapper__item-actions">\n      <a class=\'dpr-user-list-action govuk-link--no-visited-state\' href="http://localhost:3010/async/report/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true">Refresh</a>\n      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-viewed-report-button"" href="#" data-execution-id=\'exId_1721738907386\'>Remove</a>\n    </div>',
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
    amount: 5,
    shown: 5,
    max: 10,
  },
  meta: [
    {
      reportId: 'test-report-1',
      id: 'variantId-1',
      executionId: 'exId_1721738244284',
      status: 'READY',
      type: 'report',
    },
    {
      reportId: 'test-report-2',
      id: 'variantId-2',
      executionId: 'exId_1721738907386',
      status: 'EXPIRED',
      type: 'report',
    },
    {
      reportId: 'test-report-3',
      id: 'variantId-3',
      executionId: 'exId_1721738907388',
      status: 'READY',
      type: 'report',
    },
    {
      reportId: 'test-report-1',
      id: 'variantId-1',
      executionId: 'exId_1721738244284',
      status: 'READY',
      type: 'report',
    },
    {
      reportId: 'test-report-2',
      id: 'variantId-2',
      executionId: 'exId_1721738907386',
      status: 'EXPIRED',
      type: 'report',
    },
  ],
  csrfToken: 'csrfToken',
  maxRows: 10,
}

module.exports = mockViewedUserListRenderData
