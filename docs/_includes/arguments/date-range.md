| Name            | Type   | Required | Description                                                  |
| --------------- | ------ | -------- | ------------------------------------------------------------ |
| data            | object | Yes      | Data object. See [filter](#Filter).                          |
| parameterPrefix | string | no       | The prefix to apply to the filter parameters in the page URL |

### Filter

| Name  | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| text  | String | Yes      | The title of the field            |
| name  | String | Yes      | The unique ID of the input        |
| value | object | Yes      | Data object. See [Value](#Value). |
| min   | String | No       | The min date in format YYYY-MM-DD |
| max   | String | No       | The max date in format YYYY-MM-DD |

### Value

| Name  | Type   | Required | Description                         |
| ----- | ------ | -------- | ----------------------------------- |
| start | String | Yes      | The start date in format YYYY-MM-DD |
| end   | String | Yes      | The end date in format YYYY-MM-DD   |
