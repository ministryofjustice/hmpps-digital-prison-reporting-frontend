### Rendering using method: renderListWithData

| Name                        | Type     | Required | Description                                                                                                                                                       |
| --------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                       | String   | Yes      | The page title.                                                                                                                                                   |
| ReportName                  | String   | Yes      | The name of the report.                                                                                                                                           |
| variantDefinition           | Object   | Yes      | The Report Definition object                                                                                                                                      |
| request                     | Object   | Yes      | The request object (from the request handler's arguments).                                                                                                        |
| response                    | Object   | Yes      | The response object (from the request handler's arguments).                                                                                                       |
| getListDataSources          | Function | Yes      | A function that accepts a [Report Query](#report-query), and returns data sources for the report. See [List Data Sources](#list-data-sources).                    |
| otherOptions                | Object   | No       | Other parameters to pass to the page (possibly used by the layout template).                                                                                      |
| layoutTemplate              | String   | No       | The name of the parent layout template - which should include header, footer, etc.                                                                                |
| dynamicAutocompleteEndpoint | String   | No       | Endpoint for dynamic autocomplete filters (if used). This needs to have field name and prefix tokens, for example: `/dynamic-values/{fieldName}?prefix={prefix}`. |

### VariantDefinition

| Name           | Type          | Required | Description                                                   |
| -------------- | ------------- | -------- | ------------------------------------------------------------- |
| id             | String        | Yes      | The ID of the Variant.                                        |
| name           | String        | Yes      | The name of the variant.                                      |
| resourceName   | String        | Yes      | The name of the resource.                                     |
| description    | string        | No       | The Variant description.                                      |
| specification  | Specification | No       | The fields specification. See [Specification](#specification) |
| classification | string        | Yes      | Thre report classification.                                   |
| printable      | boolean       | Yes      | Whether the report is printable                               |

### Specification

| Name   | Type              | Required | Description                                                    |
| ------ | ----------------- | -------- | -------------------------------------------------------------- |
| fields | FieldDefinition[] | Yes      | The fields definition. See [FieldDefinition](#fieldDefinition) |

### FieldDefinition

| Name        | Type          | Required | Description                                                                               |
| ----------- | ------------- | -------- | ----------------------------------------------------------------------------------------- |
| name        | String        | Yes      | The code-friendly name of the field (e.g. 'startDate').                                   |
| display     | String        | Yes      | The name of the field to display to users (e.g. 'Start Date').                            |
| wordWrap    | String        | Yes      | The wrapping behaviour of data in the field. Set to 'None' to prevent data from wrapping. |
| filter      | string        | No       | Whether the field can be filtered, and how. See [Filter](#filter).                        |
| sortable    | Specification | No       | Whether to display sorting options for this field. See [Specification](#specification)    |
| defaultsort | string        | Yes      | Whether to this field is sorted by default.                                               |
| type        | boolean       | Yes      | The type of data displayed by this field. One of: 'String', 'Date', or 'Long'.            |
| mandatory   | boolean       | Yes      | Whether the field is mandatory                                                            |
| visible     | boolean       | Yes      | Whether the field is visible by default.                                                  |

### Filter

| Name          | Type   | Required | Description                                                                            |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| type          | String | Yes      | The type of the filter. One of: Select, Radio, DateRange, or Autocomplete.             |
| staticOptions | Array  | No       | The options to display if this filter is a select or a radio. See [Options](#options). |
| defaultValue  | String | No       | The value of the filter selected by default.                                           |

### Options

| Name        | Type   | Required | Description                                                     |
| ----------- | ------ | -------- | --------------------------------------------------------------- |
| name        | String | Yes      | The code-friendly value of an option (e.g. 'first-item')        |
| displayName | String | Yes      | The name of the option to display to users (e.g. 'First item'). |

### List Data Sources

| Name  | Type    | Required | Description                                                                                               |
| ----- | ------- | -------- | --------------------------------------------------------------------------------------------------------- |
| data  | Promise | Yes      | A Promise that returns an array of data rows, where each row is a Dict (or map) of field names to values. |
| count | Promise | Yes      | A Promise that returns the total number of rows across all pages.                                         |

### Report Query

This object is passed to the getListDataSources function, to allow you to request data from your API using the page's filters, sorting, etc.

| Name         | Type    | Required | Description                                                         |
| ------------ | ------- | -------- | ------------------------------------------------------------------- |
| selectedPage | Number  | Yes      | The current page of data.                                           |
| pageSize     | Number  | Yes      | How large each page of data is.                                     |
| sortColumn   | String  | No       | The field the page is currently sorted by.                          |
| sortedAsc    | Boolean | Yes      | Whether the data is sorted ascending or not.                        |
| filters      | Object  | Yes      | A Dict (or map) of field names to currently selected filter values. |

### Rendering using handler: renderListWithDefinition

| Name                        | Type     | Required | Description                                                                                                                                                       |
| --------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                       | String   | Yes      | The page title.                                                                                                                                                   |
| definitionName              | String   | Yes      | The name of the report definition to use for this page.                                                                                                           |
| variantName                 | String   | Yes      | The name of the variant to use for this page.                                                                                                                     |
| apiUrl                      | String   | Yes      | The URL of the API to use (created using the [API library](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-lib)).                             |
| apiTimeout                  | Number   | No       | The timeout to use when calling the API.                                                                                                                          |
| otherOptions                | Object   | No       | Other parameters to pass to the page (possibly used by the layout template).                                                                                      |
| layoutTemplate              | String   | No       | The name of the parent layout template - which should include header, footer, etc.                                                                                |
| tokenProvider               | Function | No       | A function that can be called (with `(request, response, next)`) that will provide the user's authentication token.                                               |
| dynamicAutocompleteEndpoint | String   | No       | Endpoint for dynamic autocomplete filters (if used). This needs to have field name and prefix tokens, for example: `/dynamic-values/{fieldName}?prefix={prefix}`. |
| definitionsPath             | String   | No       | The path to the DPD to use for this page.                                                                                                                       |

### Rendering using handler: createReportListRequestHandler

| Name                        | Type     | Required | Description                                                                                                                                                     |
|-----------------------------| -------- | -------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title                       | String   | Yes      | The page title.                                                                                                                                                 |
| definitionName              | String   | Yes      | The name of the report definition to use for this page.                                                                                                         |
| variantName                 | String   | Yes      | The name of the variant to use for this page.                                                                                                                   |
| apiUrl                      | String   | Yes      | The URL of the API to use (created using the [API library](https://github.com/ministryofjustice/hmpps-digital-prison-reporting-lib)).                           |
| apiTimeout                  | Number   | No       | The timeout to use when calling the API.                                                                                                                        |
| otherOptions                | Object   | No       | Other parameters to pass to the page (possibly used by the layout template).                                                                                    |
| layoutTemplate              | String   | No       | The name of the parent layout template - which should include header, footer, etc.                                                                              |
| tokenProvider               | Function | No       | A function that can be called (with `(request, response, next)`) that will provide the user's authentication token.                                             |
| dynamicAutocompleteEndpoint | String   | No       | Endpoint for dynamic autocomplete filters (if used). This needs to have field name and prefix tokens, for example: `/dynamic-values/{fieldName}?prefix={prefix}`. |
| definitionsPath             | String   | No       | The path to the DPD to use for this page.                                                                                                                       |
