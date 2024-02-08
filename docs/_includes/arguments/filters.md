
| Name             | Type   | Required | Description                                                                            |
|------------------|--------|----------|----------------------------------------------------------------------------------------|
| filters          | Array  | Yes      | An array of filters. See [Filters](#filters).                                          |
| urlWithNoFilters | String | Yes      | The page URL without any filters applied.                                              |
| parameterPrefix  | String | No       | The prefix to apply to the filter parameters in the page URL (defaults to 'filters.'). |

### Filters

| Name    | Type   | Required | Description                                                                            |
|---------|--------|----------|----------------------------------------------------------------------------------------|
| text    | String | Yes      | The text to show next to the filter.                                                   |
| id      | String | Yes      | The unique ID of the filter.                                                           |
| type    | String | Yes      | The type of the filter. One of: Select, Radio, DateRange, or Autocomplete.             |
| options | Array  | No       | The options to display if this filter is a select or a radio. See [Options](#options). |
| value   | String | No       | The currently selected value of the filter.                                            |
| value   | String | No       | The currently selected value of the filter.                                            |

### Options

| Name       | Type    | Required | Description                                                                                                  |
|------------|---------|----------|--------------------------------------------------------------------------------------------------------------|
| value      | String  | No       | Value for the option item. Defaults to an empty string.                                                      |
| text       | String  | Yes      | Text for the option item.                                                                                    |
| selected   | Boolean | No       | Whether the option should be selected when the page loads. Takes precedence over the top-level value option. |
| disabled   | Boolean | No       | Sets the option item as disabled.                                                                            |
| attributes | Object  | No       | HTML attributes (for example data attributes) to add to the option.                                          |