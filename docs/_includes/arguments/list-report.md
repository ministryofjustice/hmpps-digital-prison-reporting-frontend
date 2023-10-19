| Name               | Type     | Required | Description                                                                                                                                    |
|--------------------|----------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| title              | String   | Yes      | The page title.                                                                                                                                |
| fields             | Array    | Yes      | An array of columns to show on the report. See [Fields](#fields).                                                                              |
| request            | Object   | Yes      | The request object (from the request handler's arguments).                                                                                     |
| response           | Object   | Yes      | The response object (from the request handler's arguments).                                                                                    |
| getListDataSources | Function | Yes      | A function that accepts a [Report Query](#report-query), and returns data sources for the report. See [List Data Sources](#list-data-sources). |
| otherOptions       | Object   | No       | Other parameters to pass to the page (possibly used by the layout template).                                                                   |
| layoutTemplate     | String   | No       | The name of the parent layout template - which should include header, footer, etc.                                                             |

### Fields

| Name              | Type    | Required | Description                                                                               |
|-------------------|---------|----------|-------------------------------------------------------------------------------------------|
| name              | String  | Yes      | The code-friendly name of the field (e.g. 'startDate').                                   |
| displayName       | String  | Yes      | The name of the field to display to users (e.g. 'Start Date').                            |
| wordWrap          | String  | No       | The wrapping behaviour of data in the field. Set to 'None' to prevent data from wrapping. |
| filter            | Object  | No       | Whether the field can be filtered, and how. See [Filter](#filter).                        |
| sortable          | Boolean | Yes      | Whether to display sorting options for this field.                                        |
| defaultSortColumn | Boolean | Yes      | Whether to this field is sorted by default.                                               |
| type              | String  | Yes      | The type of data displayed by this field. One of: 'String', 'Date', or 'Long'.            |

### Filter

| Name          | Type   | Required | Description                                                                            |
|---------------|--------|----------|----------------------------------------------------------------------------------------|
| type          | String | Yes      | The type of the filter. One of: Select, Radio, or DateRange.                           |
| staticOptions | Array  | No       | The options to display if this filter is a select or a radio. See [Options](#options). |
| defaultValue  | String | No       | The value of the filter selected by default.                                           |


### Options

| Name        | Type   | Required | Description                                                     |
|-------------|--------|----------|-----------------------------------------------------------------|
| name        | String | Yes      | The code-friendly value of an option (e.g. 'first-item')        |
| displayName | String | Yes      | The name of the option to display to users (e.g. 'First item'). |

## List Data Sources

| Name  | Type    | Required | Description                                                                                               |
|-------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| data  | Promise | Yes      | A Promise that returns an array of data rows, where each row is a Dict (or map) of field names to values. |
| count | Promise | Yes      | A Promise that returns the total number of rows across all pages.                                         |

## Report Query

This object is passed to the getListDataSources function, to allow you to request data from your API using the page's filters, sorting, etc.

| Name         | Type    | Required | Description                                                         |
|--------------|---------|----------|---------------------------------------------------------------------|
| selectedPage | Number  | Yes      | The current page of data.                                           |
| pageSize     | Number  | Yes      | How large each page of data is.                                     |
| sortColumn   | String  | No       | The field the page is currently sorted by.                          |
| sortedAsc    | Boolean | Yes      | Whether the data is sorted ascending or not.                        |
| filters      | Object  | Yes      | A Dict (or map) of field names to currently selected filter values. |
