const { mockAgeBreakdownData } = require('./data')

const generateAgeBreakdownData = (establishment, wing) => {
  let data = [...mockAgeBreakdownData[0]]
  if (establishment) {
    data = data.map((d) => {
      return {
        ...d,
        establishment_id: { raw: establishment },
      }
    })
  } else {
    data = data.map((d) => {
      return {
        ...d,
        establishment_id: { raw: 'All' },
      }
    })
  }

  if (wing) {
    data = data.map((d) => {
      if (d.wing.raw === '') {
        return d
      }
      return {
        ...d,
        wing: { raw: wing },
      }
    })
  } else {
    data = data.map((d) => {
      return {
        ...d,
        wing: { raw: '' },
        cell: { raw: '' },
      }
    })
  }
  return [data]
}

module.exports = {
  generateAgeBreakdownData,
}
