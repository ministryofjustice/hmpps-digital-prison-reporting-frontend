Below you can find the changes included in each release.

## v4.13.19
- Make missing reports unable to be bookmarked

## v4.13.18
- Fix small bug passing the wrong params into `DefinitionUtils.getReportSummary`

## v4.13.17
- Fix missing csrf token in apply columns post 
- Small css fix for parent-child template

## v4.13.16
- Fix for various performance issues when many DPDs are present

## v4.13.15
- Fixed a bug where adding/removing a bookmark would break due to click events not being handled correctly
- Fixed a bug with setting user defaults

## v4.13.14
- Bug fix for error thrown when a single multi-select value is saved + tests

## v4.13.13
- When a single mult-iselect value is selected it is returned as a `string` and not `string[]`. Caused the `forEach` to throw an error
- Fix styling issue with save defaults button

## v4.13.12
- Missing csrf token apply and save forms
- Fix sort
- Fix typo

## v4.13.11
- Add logging to try and diagnose a performance issue

## v4.13.10
- Update dev docs for dashboards
- On initial load, dashboards weren't applying the default filter values to the request query.
- Show request details on dashboard heading

## v4.13.9
- Fix typing issue
- Fix import issue

## v4.13.8
- Merge differing package.jsons in publishing/ folder and in base and only use one in base
- Fix couple issues with `getFilters` call in dashboard utils and `setAsRecentlyViewed` where incorrect parameters were being sent

## v4.13.7
- Add ability to save interactive filters as defaults
- Update content on the request missing report form
- Use standard server-side validation and POST for missing report form, introduce use of [Zod (a validation library)](https://github.com/colinhacks/zod)
- Fix bug where default path for missing reports was not being sent

## v4.13.6
- Fix typing issues

## v4.13.5
- Change bookmark element from a div to a button and use `click` event instead of `change` to improve accessibility (this change introduced a bug when adding/removing a bookmark which is fixed in 4.13.15)
- Convert interactive filter form submission from get to post
- Remove page size from dashboard requests as a full dataset is required for the visualisations
- Fix dashboard bookmarks
- Remove "Value for" in list vis if no timestamp is provided
- Tidying up the various network mocks added as a result of the changes in v4.13.1
- Deleting mock code that is now unused
- Improving cypress tests
- Updating docs
- Update dev docs
- Remove jest tests which are now better covered with cypress ones, add some more cypress tests
- Bump tar-fs due to dependency issue

## v4.13.4
- Fix dependencies

## v4.13.3
- No changes

## v4.13.2
- No changes

## v4.13.1
- Remove a bunch of mock code being used to test the library, and use cypress tests to drive library code using network level mocks
- Fix a couple of typing and accessibility issues
- Fix to bug whereby the date format was incorrect for the date values of interactive selected filters
- Fix various typing issues surfaced by enabling strictmode during dev, add new guardrails where types surfaced issues
- Remove logging json in view for multiselect
- Fix multiselect selected filter bug - clicking selected filter did not remove the checks in multiselect
- Update the publish Github Action to support OIDC auth

## v4.13.0
- Add ability to save user defined sort values as defaults
- Refactor sync cypress tests

## v4.12.4
- Fix download sort bug in sync, fix typing issue

## v4.12.3
- Fix download sort bug where it was defaulting back to DPD sort

## v4.12.2
- Queryparams for sort were defaulting to DPD value, so set them to requested ones

## v4.12.1
- Ensure missing report API client is initialised, fix a test

## v4.12.0
- Library integration update: Define a bespoke dpr user context in `res.locals` to interact with the platform, to ensure all integrating services provide all the required configuration, and leave the `locals.user` context to the discretion of the intergrating service. Services updating to this version will need to update their `populateCurrentUser` middleware to accomodate this change. See the <a href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/integration-guides/integrating-the-platform/#setup-the-dpr-user-in-locals" target="_blank">integration docs</a> for instructions. 

## v4.11.6
- Download Bugfix: Column mismatch with screen and downloaded data
- Accessibility fixes
- Increased behaviour testing coverage

## v4.11.0
- Improvements to the test application + docs on how to run locally
- Accessibility fixes
- Enable platform routes to be nested within services routing structure

## v4.10.1
- Make the UI sort to the default sort direction if present in the DPD
- Fix more build artifact issues, make the test app build on top of the lib more like a normal app would

## v4.9.1
- Bugfix for chart imports

## v4.9.0
- User can save the values of a filters form to automatically pre-fill filter values for sub-sequent report requests of the same report
- Bugfix for css and js exports

## v4.8.1
- Small bugfix for docs publishing

## v4.8.0
- Bugfixes for build issues
- More routes refactoring to conform to new pattern

## v4.7.0
- Refactored build system to use ESBuild as per the template instead of Gulp
- Refactored routes - added journeys to routes folder, implemented new routing pattern that groups together files by feature, rather than type
- Catalogue missing reports
- Missing reports are shown in the catalogue and tagged as missing.
- Uses the `isMissing` flag in the DPD to determine its status
- New catalogue filters to toggle the show/hide of missing reports
- New catalogue filters to toggle show/hide of live reports
- Refactored catalogue filters class
- Added filter for catalogue to filter the list by report type
- Fixed variant name issue on submitted page.
- Fixed H3 accessibility issue


## v4.6.4

- Bugfix: show all dataset as list fixed

## v4.6.3

- Update express to 5.1.0
- Update docs for dashboards

## v4.6.2

- Reset filters button re-positioned

## v4.6.1

- Selected filters are shown on the request filter page
- Interactive filter values are shown in the users viewed report list

## v4.5.1

### Bug fixes and UI styling/content updates

- Removed secondary reset button
- More descriptive report action buttons
- Consistant labeking of filters and columns

## v4.5.0

- New template builder: `row-section`.
- FE component docs update.

## v4.4.5

- Bookmarking bugfix: Use variant ID + report ID to create unique bookmark key
- Various style updates.

## v4.4.2

- Design tweaks
- Catalogue listing totals

## v4.4.1

- bugfix: automatic bookmarking doesn't fall over when no config is provided

## v4.4.0

### Security review

- Updated npm packages. Fixed vulnerabilities 

### UI Styling updates

- UI styling more inline with existing styles and patterns:
  - Updated filters sections to better align with existing filters component
  - Updated report totals to better align with existing totals component
  - Moved reset filters button on async filters to be next to filters

### Docs

- More examples of template types. 

## v4.3.0

- `parent-child-section` report template.

## v4.2.6

### Bugfixes

- User reports listing page components not found
- Bookmarks capped at 6

## v4.2.5

### DPR Platform integration process
- Integration process for embedding the DPR platform into DPS's
- Configurable platform features
- Configurable definitions path
- Integration process docs

### Documentation Updates: 
  - new/updated component docs
  - Updated Lib integration docs
  - Improved IA and styling.

## v4.1.26

- BugFix: Parent child template fixed.

## v4.1.24

- Improvements to the documentation application.

## v4.1.23

- Embedded reports integration:  
  - Fixed path issues with moj and dpr sass imports
  - Fixed lib dependecy issues.
  - Updated integration docs to outline process for services using bundlers

- Embedded reports actions: 
  - Fixed copy button to include full url

- Dashboard visualisations: Support for line chart visualisation type

## v4.1.16

- Embedded reports integration: Moved all.js to root of lib folder: `dpr/all.js`

## v4.1.15

- Async reports: Bugfix: Fix request when Select/radio input value is None.

## v4.1.14

- Embedded reports: Streamlined integration process. Removed need to add individual dpr dependencies to project. Follows same init pattern as moj and govuk libs.

## v4.1.13

- Bugfix: Dashboard description is optional

## v4.1.12

- Bugfix: Relative daterange updating filters correctly
- Bugfix: Print feature displaying all columns for large reports

## v4.1.11

- Multiselect updates: Selected filter for multiselect shortened. Scrollbar when many select options

## v4.1.10

Embedded reports
- Bugfix: variant name instead of variant ID in report heading
- Bugfix: Print feature - filters removed, urls in links removed

Interactive async reports
- bugfix: initial report load uses correct query
- bugfix: min and max constraints applied to api request when filter is removed
- bugfix: reset button

## v4.1.9

- Dashbaord request filters
- Change to call a difference execution cancellation endpoint for dashboards to support dashboards running on other data sources apart from Redshift.

## v4.1.8

- Change to call a different status endpoint for dashboards in order to support dashboards running on other data sources apart from Redshift.

## v4.1.7

- Bugfix: filters default to initial values if all filters are removed. fixed
- Bugfix: Error when no default value provided in multiselect filter.

## v4.1.6

- Bugfix:  daterange query param issue on initial load
- Bugfix:  daterange required bug - input was always mandatory.
- Bugfix:  daterange validation message

## v4.1.5

- Bugfix: Run correct query on initial report load 


## v4.1.4

- Bugfix: Embedded report list: use `dataProductDefinitionsPath` if provided, otherwise use `definitionsPath` 

## v4.1.3

- Bugfix: multi-select filter: fix `join(',') error when query param is a string
- Bugfix: multi-select filter: removing all checkboxes and applying sets the values to default. Fixed

## v4.1.1

- Bugfix: multi-select filter throws error when initial value is undefined in the definition.

## v4.1.0

- Embedded Report filters component has been replaced with DPR app component & processes
- Filter inputs update: Improved validation for checkboxes, radio and select inputs
- Filter inputs update: Radio and select options include 'None' when input is not mandatory/required
- Bugfix: multiselect query parameters work properly

## v4.0.2

- bugfix: Embedded reports datepicker date formatting 

## v4.0.1

- Updated nunjucks filter name 

## v4.0.0 

- Updated dashboard definition
- Updated dashboard visualisation defininition

## v3.32.9

Update to MoJ v3.

## v3.32.8

Consolidate package dependencies.

## v3.24.0

- Section header and footer summary.
- Listless template.

## v3.23.3

Fix HTML tags interfering with Show More component.

## v3.20.0

- Section summaries.

## v3.18.0

- Header and footer page summaries.

## v3.17.0

- Consolidated report requests.

## v3.16.0

- Sectioned list template.
- Icon action list in sync data table.
- Removed redundant dropdown action list and component buttons.

## v3.15.3

- Single component for choosing columns in both journeys.
- Async column section now has loading spinner and "X of Y shown" summary.
- Optional hint on non-mandatory filters.

## v3.15.1 - v3.15.2

- Bookmarking

## v3.14.2

- Make async sorting options mandatory
- Update documentation for Google fonts

## v3.14.1

Abort status updates

## v3.14.0

Added:

- Text filter type.
- Mandatory filter validation.
- Filter text pattern validation.

## v3.9.0

Added Search component.

## v3.7.10

Add definition path to Report List utility methods.

## v3.7.8

Ensure no CSS adversely effects consumer projects

## v3.7.7

Isolate component SASS so that it does not interfere with consumers' site styles.

## v3.7.6

Update integration documentation to avoid Chrome security warnings about inline scripts.

## v3.7.5

Update GovUK dependency.

## v3.7.4

Fix formatting in List Report documentation.

## v3.7.2

Fixed Issue #83 - Inline style violates Content Security Policy directive.

## v3.7.1

Updated publish action to avoid writing to main.

## v3.7.0

Support more word wrapping options, and more field types.

## v3.6.0

- Updated loading state on table view.
- Menu card loading state.
- Total Results count displayed on report list.

## v3.5.7

Avoid reformatting dates that are the product of a formula.

## v3.5.6

Add accessibility testing to CICD and fix highlighted issues.

## v3.5.4

Report List improvements

## v3.5.3

Added changelog.
