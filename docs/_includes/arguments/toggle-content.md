### Options

| Name  | Type   | Required | Description                            |
| ----- | ------ | -------- | -------------------------------------- |
| id    | String | Yes      | The unique id                          |
| icons | Icons  | Yes      | The Icon data. See [Icons](#icons).    |
| items | Items  | Yes      | The content data. See [Items](#items). |

### Icons

| Name    | Type   | Required | Description                   |
| ------- | ------ | -------- | ----------------------------- |
| name    | String | Yes      | The icon name                 |
| tooltip | String | Yes      | The tooltip text for the icon |

### Items

| Name   | Type    | Required | Description                   |
| ------ | ------- | -------- | ----------------------------- |
| html   | String  | Yes      | The HTML content              |
| active | boolean | Yes      | Sets the defualt active state |
