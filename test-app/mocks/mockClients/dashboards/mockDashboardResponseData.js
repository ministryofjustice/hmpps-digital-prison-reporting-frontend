const dayjs = require('dayjs')

const establishmentIds = ['MDI', 'SLI', 'DAI', 'LTI']

const createTimeSeriesData = (start, end, granularity, sets) => {
  const timeseriesArr = createTimestamps(start, end, granularity, sets)
  return timeseriesArr.map((item) => {
    return item.map((entry) => {
      const hasEthnicity = generateRawValue()
      const ethnicityIsMissing = generateRawValue()
      const hasNationality = generateRawValue()
      const nationalityIsMissing = generateRawValue()
      const hasReligion = generateRawValue()
      const religionIsMissing = generateRawValue()

      return {
        ...entry,
        has_ethnicity: {
          raw: hasEthnicity,
          rag: generateRag(hasEthnicity),
        },
        ethnicity_is_missing: {
          raw: ethnicityIsMissing,
          rag: generateRag(ethnicityIsMissing),
        },
        has_nationality: {
          raw: hasNationality,
          rag: generateRag(hasNationality),
        },
        nationality_is_missing: {
          raw: nationalityIsMissing,
          rag: generateRag(nationalityIsMissing),
        },
        has_religion: {
          raw: hasReligion,
          rag: generateRag(hasReligion),
        },
        religion_is_missing: {
          raw: religionIsMissing,
          rag: generateRag(religionIsMissing),
        },
      }
    })
  })
}

const createTimestamps = (start, end, granularity, sets) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const endVal = end || endDate.add(1, g)
  const diff = Math.abs(startDate.diff(endVal, g, true))
  const roundedCount = g === 'day' ? Math.ceil(diff + 1) : Math.ceil(diff)
  const dateFormat = setFormat(g)

  // console.log(
  //   JSON.stringify(
  //     {
  //       g,
  //       start,
  //       end,
  //       endDate,
  //       startDate,
  //       diff,
  //       roundedCount,
  //       dateFormat,
  //     },
  //     null,
  //     2,
  //   ),
  // )

  const timestamps = []
  for (let i = 0; i < roundedCount; i += 1) {
    const date = endDate.subtract(i, g).format(dateFormat)
    const ts = []
    for (let index = 0; index < sets; index += 1) {
      ts.push({
        timestamp: date,
        establishment_id: {
          raw: establishmentIds[index],
        },
      })
    }
    timestamps.unshift(ts)
  }

  return timestamps
}

const mapGranularityValue = (granularity) => {
  let mappedValue = 'days'
  switch (granularity) {
    case 'daily':
      mappedValue = 'day'
      break
    case 'monthly':
      mappedValue = 'month'
      break
    case 'annually':
      mappedValue = 'year'
      break
    default:
      break
  }

  return mappedValue
}

const setFormat = (granularity) => {
  switch (granularity) {
    case 'day':
      return 'YYYY/MM/DD'
    case 'month':
      return 'MMM YY'
    case 'year':
      return 'YYYY'
    default:
      return 'YYYY/MM/DD'
  }
}

const generateRawValue = () => {
  return Math.round(Math.random() * (800 - 400) + 400)
}

const generateRag = (value) => {
  let ragValue

  if (value < 800) ragValue = 2
  if (value < 600) ragValue = 1
  if (value < 500) ragValue = 0

  return ragValue
}

const mockTimeSeriesDataLastSixMonths = [
  [
    {
      timestamp: 'Aug 24',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 424,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 781,
        rag: 2,
      },
      has_nationality: {
        raw: 459,
        rag: 0,
      },
      nationality_is_missing: {
        raw: 528,
        rag: 1,
      },
      has_religion: {
        raw: 576,
        rag: 1,
      },
      religion_is_missing: {
        raw: 447,
        rag: 0,
      },
    },
    {
      timestamp: 'Aug 24',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 761,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 610,
        rag: 2,
      },
      has_nationality: {
        raw: 734,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 785,
        rag: 2,
      },
      has_religion: {
        raw: 758,
        rag: 2,
      },
      religion_is_missing: {
        raw: 694,
        rag: 2,
      },
    },
    {
      timestamp: 'Aug 24',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 401,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 499,
        rag: 0,
      },
      has_nationality: {
        raw: 611,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 524,
        rag: 1,
      },
      has_religion: {
        raw: 734,
        rag: 2,
      },
      religion_is_missing: {
        raw: 404,
        rag: 0,
      },
    },
  ],
  [
    {
      timestamp: 'Sep 24',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 733,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 514,
        rag: 1,
      },
      has_nationality: {
        raw: 573,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 554,
        rag: 1,
      },
      has_religion: {
        raw: 637,
        rag: 2,
      },
      religion_is_missing: {
        raw: 430,
        rag: 0,
      },
    },
    {
      timestamp: 'Sep 24',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 559,
        rag: 1,
      },
      ethnicity_is_missing: {
        raw: 518,
        rag: 1,
      },
      has_nationality: {
        raw: 453,
        rag: 0,
      },
      nationality_is_missing: {
        raw: 758,
        rag: 2,
      },
      has_religion: {
        raw: 562,
        rag: 1,
      },
      religion_is_missing: {
        raw: 430,
        rag: 0,
      },
    },
    {
      timestamp: 'Sep 24',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 656,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 521,
        rag: 1,
      },
      has_nationality: {
        raw: 659,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 531,
        rag: 1,
      },
      has_religion: {
        raw: 719,
        rag: 2,
      },
      religion_is_missing: {
        raw: 573,
        rag: 1,
      },
    },
  ],
  [
    {
      timestamp: 'Oct 24',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 738,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 598,
        rag: 1,
      },
      has_nationality: {
        raw: 638,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 417,
        rag: 0,
      },
      has_religion: {
        raw: 428,
        rag: 0,
      },
      religion_is_missing: {
        raw: 767,
        rag: 2,
      },
    },
    {
      timestamp: 'Oct 24',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 692,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 676,
        rag: 2,
      },
      has_nationality: {
        raw: 758,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 521,
        rag: 1,
      },
      has_religion: {
        raw: 430,
        rag: 0,
      },
      religion_is_missing: {
        raw: 726,
        rag: 2,
      },
    },
    {
      timestamp: 'Oct 24',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 665,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 687,
        rag: 2,
      },
      has_nationality: {
        raw: 556,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 615,
        rag: 2,
      },
      has_religion: {
        raw: 460,
        rag: 0,
      },
      religion_is_missing: {
        raw: 467,
        rag: 0,
      },
    },
  ],
  [
    {
      timestamp: 'Nov 24',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 479,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 522,
        rag: 1,
      },
      has_nationality: {
        raw: 471,
        rag: 0,
      },
      nationality_is_missing: {
        raw: 546,
        rag: 1,
      },
      has_religion: {
        raw: 405,
        rag: 0,
      },
      religion_is_missing: {
        raw: 431,
        rag: 0,
      },
    },
    {
      timestamp: 'Nov 24',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 635,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 790,
        rag: 2,
      },
      has_nationality: {
        raw: 581,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 660,
        rag: 2,
      },
      has_religion: {
        raw: 780,
        rag: 2,
      },
      religion_is_missing: {
        raw: 434,
        rag: 0,
      },
    },
    {
      timestamp: 'Nov 24',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 482,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 713,
        rag: 2,
      },
      has_nationality: {
        raw: 707,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 751,
        rag: 2,
      },
      has_religion: {
        raw: 715,
        rag: 2,
      },
      religion_is_missing: {
        raw: 422,
        rag: 0,
      },
    },
  ],
  [
    {
      timestamp: 'Dec 24',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 467,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 431,
        rag: 0,
      },
      has_nationality: {
        raw: 584,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 605,
        rag: 2,
      },
      has_religion: {
        raw: 746,
        rag: 2,
      },
      religion_is_missing: {
        raw: 423,
        rag: 0,
      },
    },
    {
      timestamp: 'Dec 24',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 577,
        rag: 1,
      },
      ethnicity_is_missing: {
        raw: 536,
        rag: 1,
      },
      has_nationality: {
        raw: 524,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 664,
        rag: 2,
      },
      has_religion: {
        raw: 721,
        rag: 2,
      },
      religion_is_missing: {
        raw: 692,
        rag: 2,
      },
    },
    {
      timestamp: 'Dec 24',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 660,
        rag: 2,
      },
      ethnicity_is_missing: {
        raw: 590,
        rag: 1,
      },
      has_nationality: {
        raw: 529,
        rag: 1,
      },
      nationality_is_missing: {
        raw: 708,
        rag: 2,
      },
      has_religion: {
        raw: 509,
        rag: 1,
      },
      religion_is_missing: {
        raw: 718,
        rag: 2,
      },
    },
  ],
  [
    {
      timestamp: 'Jan 25',
      establishment_id: {
        raw: 'MDI',
      },
      has_ethnicity: {
        raw: 533,
        rag: 1,
      },
      ethnicity_is_missing: {
        raw: 614,
        rag: 2,
      },
      has_nationality: {
        raw: 684,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 665,
        rag: 2,
      },
      has_religion: {
        raw: 680,
        rag: 2,
      },
      religion_is_missing: {
        raw: 799,
        rag: 2,
      },
    },
    {
      timestamp: 'Jan 25',
      establishment_id: {
        raw: 'SLI',
      },
      has_ethnicity: {
        raw: 484,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 713,
        rag: 2,
      },
      has_nationality: {
        raw: 700,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 506,
        rag: 1,
      },
      has_religion: {
        raw: 771,
        rag: 2,
      },
      religion_is_missing: {
        raw: 457,
        rag: 0,
      },
    },
    {
      timestamp: 'Jan 25',
      establishment_id: {
        raw: 'DAI',
      },
      has_ethnicity: {
        raw: 406,
        rag: 0,
      },
      ethnicity_is_missing: {
        raw: 682,
        rag: 2,
      },
      has_nationality: {
        raw: 703,
        rag: 2,
      },
      nationality_is_missing: {
        raw: 409,
        rag: 0,
      },
      has_religion: {
        raw: 648,
        rag: 2,
      },
      religion_is_missing: {
        raw: 720,
        rag: 2,
      },
    },
  ],
]

module.exports = {
  createTimeSeriesData,
  mockTimeSeriesDataLastSixMonths,
}
