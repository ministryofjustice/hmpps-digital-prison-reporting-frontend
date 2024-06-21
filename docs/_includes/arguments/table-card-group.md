### Head

| Name  | Type   | Required | Description                                       |
| ----- | ------ | -------- | ------------------------------------------------- |
| title | String | Yes      | The text to be displayed as the section title     |
| icon  | String | Yes      | The name of the icon to use in the section header |
| id    | String | Yes      | The Unique ID                                     |

### CardsData

| Name        | Type      | Required | Description                                                                                |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------ |
| id          | String    | Yes      | The card Unique ID                                                                         |
| text        | String    | Yes      | The text to be displayed in the title link of the card.                                    |
| href        | String    | Yes      | The URL that the card should link to.                                                      |
| description | String    | Yes      | The explanatory text to be displayed underneath the card title link.                       |
| timestamp   | String    | no       | The timestamp displayed at the bottom of the card                                          |
| status      | String    | no       | A status that displays in the bottom right                                                 |
| Summary     | Summary[] | no       | A bulleted list Replaces the description if provided description, See [Summary](#summary). |

### TableData

see [gov table](https://design-system.service.gov.uk/components/table/)

### Summary

| Name  | Type   | Required | Description                   |
| ----- | ------ | -------- | ----------------------------- |
| name  | String | Yes      | The name of the bulleted item |
| value | String | Yes      | The valie                     |
