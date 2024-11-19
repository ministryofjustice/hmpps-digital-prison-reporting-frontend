export default {
  getTotals: (pageSize: number, currentPage: number, totalRows: number, rowCount: number): string => {
    let totals = ''

    const currentRangeStart = (currentPage - 1) * pageSize
    const currentRangeEnd = currentRangeStart + rowCount

    if (currentRangeStart === 0 && totalRows === currentRangeEnd) {
      totals = totalRows === 1 ? `${totalRows} total result` : `${totalRows} total results`
    } else {
      totals = totalRows > 0 ? `${currentRangeStart + 1}-${currentRangeEnd} of ${totalRows}` : `0-0 of 0`
    }

    return totals
  },
}
