export const getTotals = (pageSize: number, currentPage: number, totalRows: number, rowCount: number): string => {
  let totals = ''

  const currentRangeStart = (currentPage - 1) * pageSize
  const currentRangeEnd = currentRangeStart + rowCount

  if (currentRangeStart === 0 && totalRows === currentRangeEnd) {
    totals = totalRows === 1 ? `${totalRows} total result` : `${totalRows} total results`
  } else {
    totals =
      totalRows > 0
        ? `Showing <strong>${
            currentRangeStart + 1
          }</strong> to <strong>${currentRangeEnd}</strong> of <strong>${totalRows}</strong> results`
        : `0-0 of 0`
  }

  return totals
}

export default {
  getTotals
}
