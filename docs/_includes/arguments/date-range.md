| Name            | Type     | Required | Description                                                    |
| --------------- | -------- | -------- | -------------------------------------------------------------- |
| data            | `object` | Yes      | Data object. See [filter](#Filter).                            |
| parameterPrefix | `string` | no       | The prefix to apply to the filter parameters in the page URL   |
| mandatory       | `boolean`| no       | default: false   |

### Filter

| Name  | Type   | Required | Description                       |
| ----- | ------ | -------- | --------------------------------- |
| text  | `string` | Yes      | The title of the field            |
| name  | `string` | Yes      | The unique ID of the input        |
| value | `object` | Yes      | Data object. See [Value](#Value). |
| min   | `string` | No       | The min date in format YYYY-MM-DD |
| max   | `string` | No       | The max date in format YYYY-MM-DD |

### Value

| Name  | Type   | Required | Description                         |
| ----- | ------ | -------- | ----------------------------------- |
| start | `string` | Yes      | The start date in format YYYY-MM-DD |
| end   | `string` | Yes      | The end date in format YYYY-MM-DD   |
