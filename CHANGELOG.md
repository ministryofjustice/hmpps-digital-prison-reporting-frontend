Below you can find the changes included in each release.

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
