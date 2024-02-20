| Name    | Type   | Required | Description                             |
| ------- | ------ | -------- | --------------------------------------- |
| items   | array  | Yes      | An array of cards. See [Cards](#cards). |
| variant | Number | No       | Card Variant ID. Defaults to style 1    |

### Cards

| Name        | Type   | Required | Description                                                          |
| ----------- | ------ | -------- | -------------------------------------------------------------------- |
| text        | String | Yes      | The text to be displayed in the title link of the card.              |
| href        | String | Yes      | The URL that the card should link to.                                |
| description | String | Yes      | The explanatory text to be displayed underneath the card title link. |
