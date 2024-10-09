| Name        | Type    | Required | Description                                                |
| ------------| ------- | -------- | ---------------------------------------------------------- |
| title       | string  | Yes      |  The scorecard title                                       |
| value       | string  | Yes      |  The scorecard value                                       |
| trend       | object  | no       |  The trend data See [Chart](#trend)                        |
| link        | object  | no       |  The visualisation link. See [Chart](#link)                |
| valueFor    | string  | no       |  The date the value was for                                |
| rag         | `red`, `green`, `yellow`  | no      |  The date the value was for               |

### Trend

| Name        | Type      | Required | Description                                                  |
| ------------| ----------| -------- | ------------------------------------------------------------ |
| direction   | `Up`, `Down`, `No change`    | Yes      | The trend direction                       |
| value       | string    | Yes      | The trend value                                              |
| from        | string    | Yes      | The trend comparison date                                    |

### Link

| Name        | Type      | Required | Description                                    |
| ------------| --------- | -------- | ---------------------------------------------- |
| href        | string    | Yes      | The link address                               |
| displayName | string    | Yes      | The link display name                          |
