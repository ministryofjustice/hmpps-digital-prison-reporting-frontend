// Core dependencies
const fs = require('fs');
const path = require('path');

// NPM dependencies
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// Local dependencies
const { default: reportListUtils  } = require('../package/dpr/components/report-list/utils');

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/'),
  path.join(__dirname, '../node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, '../src/dpr/'),
  path.join(__dirname, '.')
];

// Application
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Nunjucks configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

// Add filters from MOJ Frontend
let mojFilters = require('../node_modules/@ministryofjustice/frontend/moj/filters/all')();
mojFilters = Object.assign(mojFilters);
Object.keys(mojFilters).forEach(function (filterName) {
  nunjucksEnvironment.addFilter(filterName, mojFilters[filterName])
});

// Set view engine
app.set('view engine', 'njk');

// Middleware to serve static assets
app.use('/assets/ext/jquery.min.js', express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')));
app.use('/assets/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/assets')));
app.use('/assets/moj', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/assets')));
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')));
app.use('/govuk/all.js', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/all.js')));
app.use('/moj/all.js', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/all.js')));

// Set up routes
app.get('/', (req, res, next) => {
  reportListUtils.renderList({
    title: 'Test app',
    fields: [
      {
        name: 'field1',
        displayName: 'Field 1',
        sortable: true,
        defaultSortColumn: true,
        type: 'String',
        filter: {
          type: 'Radio',
          staticOptions: [
            { name: 'Value 1.1', displayName: 'Value 1.1' },
            { name: 'Value 1.2', displayName: 'Value 1.2' },
            { name: 'Value 1.3', displayName: 'Value 1.3' },
          ],
        }
      },
      {
        name: 'field2',
        displayName: 'Field 2',
        sortable: false,
        type: 'String',
        filter: {
          type: 'Select',
          staticOptions: [
            { name: 'Value 2.1', displayName: 'Value 2.1' },
            { name: 'Value 2.2', displayName: 'Value 2.2' },
            { name: 'Value 2.3', displayName: 'Value 2.3' },
          ],
        }
      },
      {
        name: 'field3',
        displayName: 'Field 3',
        sortable: false,
        type: 'Date',
        filter: {
          type: 'DateRange',
        },
        defaultValue: '2003-02-01 - 2006-05-04'
      }
    ],
    request: req,
    response: res,
    next,
    getListDataSources: () => ({
      data: Promise.resolve([
          { field1: 'Value 1.1', field2: 'Value 2.1', field3: '2003-02-01' },
          { field1: 'Value 1.2', field2: 'Value 2.2', field3: '2006-05-04' },
          { field1: 'Value 1.3', field2: 'Value 2.3', field3: '2009-08-07' },
      ]),
      count: Promise.resolve(3)
    }),
    otherOptions: {
      cards: [
        { text: 'One', description: 'The first card', href: '#one'},
        { text: 'Two', description: 'The second card', href: '#two'},
        { text: 'Three', description: 'The third card', href: '#three'},
      ]
    },
    layoutTemplate: 'page.njk'
  })
})

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'));
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`');
  process.exit(0);
}

module.exports = app;
