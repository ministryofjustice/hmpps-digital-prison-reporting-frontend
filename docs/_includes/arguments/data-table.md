### Container

| Name                   | Type            | Required | Description                                                                                    |
|------------------------|-----------------|----------|------------------------------------------------------------------------------------------------|
| head                   | Array           | Yes      | An array of column headers. See [Cells](#cells).                                               |
| rows                   | Array of Arrays | Yes      | An array (Rows) of an array ([Cells](#cells)).                                                 |
| totalRowCount          | Number          | Yes      | The total number of rows.                                                                      |
| selectedPage           | Number          | Yes      | The currently selected page (e.g. '3', which would display rows 41-60 with a page size of 20). |
| pageSize               | Number          | Yes      | The number of rows on each page.                                                               |
| sortColumn             | String          | Yes      | The column the data is sorted on (e.g. 'name').                                                |
| sortedAsc              | Boolean         | Yes      | Whether the data is sorted ascending.                                                          |
| createUrlForParameters | Function        | Yes      | A function accepting a parameter object that maps to the target URL (see the Notes section).   |

### Cells

| Name        | Type    | Required | Description                                                                                                         |
|-------------|---------|----------|---------------------------------------------------------------------------------------------------------------------|
| text        | String  | Yes      | The text to be displayed in this column header.                                                                     |
| format      | String  | No       | Format of the column header. Can be left empty to align contents left, or set to 'numeric' to align contents right. |
