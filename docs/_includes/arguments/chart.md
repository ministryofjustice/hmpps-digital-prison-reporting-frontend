| Name        | Type    | Required | Description                                                |
| ------------| ------- | -------- | ---------------------------------------------------------- |
| id          | string  | Yes      |  The chart ID                                              |
| type        | string  | Yes      |  The chart type. Valid values: `bar`, `line`, `doughnut`   |
| data        | object  | Yes      |  The data to create the visualisation. See [Chart](#chart) |

### Chart

| Name        | Type      | Required | Description                                                  |
| ------------| ----------| -------- | ------------------------------------------------------------ |
| labels      | string[]  | Yes      | The chart labels                                             |
| datasets    | Array     | Yes      | The dataset for the visualisation. See [Datasets](#datasets) |

### Datasets

| Name        | Type      | Required | Description                                    |
| ------------| --------- | -------- | ---------------------------------------------- |
| label       | string    | Yes      | The label for the dataset                      |
| data        | number[]  | Yes      | The data for visualisation                     |
| total       | number    | No       | The sum total of the data                      |
