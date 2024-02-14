
| Name                    | Type   | Required | Description                                                                                                                                                     |
|-------------------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                      | string | Yes      | A unique identifier for the input.                                                                                                                              |
| name                    | string | Yes      | The name of the input.                                                                                                                                          |
| value                   | string | No       | The current value of this input.                                                                                                                                |
| labelText               | string | No       | The text of the label displayed above this input.                                                                                                               |
| items                   | array  | No       | A static list of options to choose from. See [Items](#items). This is ignored if the dynamic resource endpoint is set.                                          |
| minimumLength           | number | No       | The minimum length of text before options are fetched/displayed.                                                                                                |
| dynamicResourceEndpoint | string | No       | The API endpoint to call to fetch the dynamic values. This should contain a `{prefix}` token to be replaced by the current text value when the request is made. |

### Items

| Name | Type   | Required | Description                                            |
|------|--------|----------|--------------------------------------------------------|
| text | String | Yes      | The value to be displayed and returned for the option. |
