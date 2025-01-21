const mockDataQualityValuesFull = [
  {
    establishment_id: 'MDI',
    count: 1182,
    has_ethnicity: 845,
    ethnicity_is_missing: 337,
    has_nationality: 668,
    nationality_is_missing: 514,
    has_religion: 667,
    religion_is_missing: 515,
  },
  {
    establishment_id: 'LTI',
    count: 1221,
    has_ethnicity: 1221,
    ethnicity_is_missing: 0,
    has_nationality: 1216,
    nationality_is_missing: 5,
    has_religion: 1216,
    religion_is_missing: 5,
  },
  {
    establishment_id: 'SLI',
    count: 1055,
    has_ethnicity: 1055,
    ethnicity_is_missing: 0,
    has_nationality: 1055,
    nationality_is_missing: 0,
    has_religion: 1055,
    religion_is_missing: 0,
  },
  {
    establishment_id: 'DAI',
    count: 634,
    has_ethnicity: 634,
    ethnicity_is_missing: 0,
    has_nationality: 632,
    nationality_is_missing: 2,
    has_religion: 632,
    religion_is_missing: 2,
  },
  {
    establishment_id: 'ASI',
    count: 413,
    has_ethnicity: 410,
    ethnicity_is_missing: 3,
    has_nationality: 411,
    nationality_is_missing: 2,
    has_religion: 411,
    religion_is_missing: 2,
  },
  {
    establishment_id: 'IWI',
    count: 1092,
    has_ethnicity: 1079,
    ethnicity_is_missing: 13,
    has_nationality: 1078,
    nationality_is_missing: 14,
    has_religion: 1078,
    religion_is_missing: 14,
  },
  {
    establishment_id: 'LYI',
    count: 501,
    has_ethnicity: 500,
    ethnicity_is_missing: 1,
    has_nationality: 500,
    nationality_is_missing: 1,
    has_religion: 500,
    religion_is_missing: 1,
  },
  {
    establishment_id: 'BRI',
    count: 657,
    has_ethnicity: 645,
    ethnicity_is_missing: 1,
    has_nationality: 641,
    nationality_is_missing: 16,
    has_religion: 641,
    religion_is_missing: 16,
  },
  {
    establishment_id: 'MSI',
    count: 593,
    has_ethnicity: 592,
    ethnicity_is_missing: 1,
    has_nationality: 592,
    nationality_is_missing: 1,
    has_religion: 592,
    religion_is_missing: 1,
  },
  {
    establishment_id: 'FNI',
    count: 588,
    has_ethnicity: 588,
    ethnicity_is_missing: 0,
    has_nationality: 583,
    nationality_is_missing: 5,
    has_religion: 583,
    religion_is_missing: 5,
  },
]

const setPercentageColumns = (data) => {
  return data.map((d) => {
    return {
      ...d,
      has_ethnicity_percentage: calcPercentage(d.count, d.has_ethnicity),
      ethnicity_is_missing_percentage: calcPercentage(d.count, d.ethnicity_is_missing),
      has_nationality_percentage: calcPercentage(d.count, d.has_nationality),
      nationality_is_missing_percentage: calcPercentage(d.count, d.nationality_is_missing),
      has_religion_percentage: calcPercentage(d.count, d.has_religion),
      religion_is_missing_percentage: calcPercentage(d.count, d.religion_is_missing),
    }
  })
}

const calcPercentage = (total, value) => {
  return Math.round((100 * value) / total)
}

module.exports = {
  'test-dashboard-1': [setPercentageColumns([mockDataQualityValuesFull[0]])],
  'test-dashboard-2': [setPercentageColumns([mockDataQualityValuesFull[0], mockDataQualityValuesFull[1]])],
  'test-dashboard-3': [
    setPercentageColumns([mockDataQualityValuesFull[0], mockDataQualityValuesFull[1], mockDataQualityValuesFull[2]]),
  ],
  'test-dashboard-4': [
    setPercentageColumns([
      mockDataQualityValuesFull[0],
      mockDataQualityValuesFull[1],
      mockDataQualityValuesFull[2],
      mockDataQualityValuesFull[3],
    ]),
  ],
  'test-dashboard-5': [
    setPercentageColumns([
      mockDataQualityValuesFull[0],
      mockDataQualityValuesFull[1],
      mockDataQualityValuesFull[2],
      mockDataQualityValuesFull[3],
      mockDataQualityValuesFull[4],
    ]),
  ],
  'test-dashboard-6': [
    setPercentageColumns([
      mockDataQualityValuesFull[0],
      mockDataQualityValuesFull[1],
      mockDataQualityValuesFull[2],
      mockDataQualityValuesFull[3],
      mockDataQualityValuesFull[4],
      mockDataQualityValuesFull[5],
    ]),
  ],
  'test-dashboard-7': [
    setPercentageColumns([
      mockDataQualityValuesFull[0],
      mockDataQualityValuesFull[1],
      mockDataQualityValuesFull[2],
      mockDataQualityValuesFull[3],
      mockDataQualityValuesFull[4],
      mockDataQualityValuesFull[5],
      mockDataQualityValuesFull[6],
    ]),
  ],
  'test-dashboard-8': [
    setPercentageColumns([
      mockDataQualityValuesFull[0],
      mockDataQualityValuesFull[1],
      mockDataQualityValuesFull[2],
      mockDataQualityValuesFull[3],
    ]),
  ],
  'test-dashboard-9': [setPercentageColumns([mockDataQualityValuesFull[0]])],
  'test-dashboard-10': [[mockDataQualityValuesFull[0]]],
}
