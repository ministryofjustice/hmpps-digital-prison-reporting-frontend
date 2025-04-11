
| Name               | Type            | Required | Description                                                                                    |
|--------------------|-----------------|----------|------------------------------------------------------------------------------------------------|
| head               | Array           | Yes      | An array of column headers. See [Cells](#cells).                                               |
| rows               | Array of Arrays | Yes      | An array (Rows) of an array ([Cells](#cells)).                                                 |
| colCount           | Number          | Yes      | The count of currently visible columns.                                                        |

### Cells

| Name        | Type    | Required | Description                                                                                                         |
|-------------|---------|----------|---------------------------------------------------------------------------------------------------------------------|
| text        | String  | Yes      | The text to be displayed in this column header.                                                                     |
| format      | String  | No       | Format of the column header. Can be left empty to align contents left, or set to 'numeric' to align contents right. |
