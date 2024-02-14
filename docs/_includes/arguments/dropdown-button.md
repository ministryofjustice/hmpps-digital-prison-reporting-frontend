
| Name    | Type   | Required | Description                                           |
| ------- | ------ | -------- | ----------------------------------------------------- |
| options | object | Yes      | Data object for dropdown menu. See [Cards](#options). |

### options

| Name    | Type   | Required | Description                                                                   |
| ------- | ------ | -------- | ----------------------------------------------------------------------------- |
| id      | String | Yes      | The button ID.                                                                |
| text    | String | Yes      | The button displayed name.                                                    |
| classes | String | No       | Class list to be applied to the button.                                       |
| items   | Array  | No       | List of items to populate the dropdown menu. See [Cards](#item)               |
| groups  | Array  | No       | List of items to populate the dropdown menu under a group. See [Cards](#item) |

### item

| Name       | Type   | Required | Description                                |
| ---------- | ------ | -------- | ------------------------------------------ |
| id         | String | Yes      | The menu item ID.                          |
| text       | String | Yes      | The menu item displayed name.              |
| classes    | String | No       | Class list to be applied to the menu item. |
| attributes | Array  | No       | attributes applied to the menu item.       |
| href       | Array  | No       | the href for the menu item.                |
