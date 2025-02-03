const mockAgeRange1TableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '18-25' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '6' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '26-34' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '12' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '35-44' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '6' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '45-54' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '2' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '56-54' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '2' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
]

const mockAgeRange2TableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '18-21' },
    total_prisoners: { raw: '2' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '22-29' },
    total_prisoners: { raw: '10' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '30-39' },
    total_prisoners: { raw: '8' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '40-49' },
    total_prisoners: { raw: '5' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '50-59' },
    total_prisoners: { raw: '3' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
]

const mockTotalTablesData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '28' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: '' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    total_prisoners: { raw: '200' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
  },
]

const mockReligionTableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'ATHE' },
    religion_description: { raw: 'Atheist' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'BUDD' },
    religion_description: { raw: 'Buddhist' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'CHRST' },
    religion_description: { raw: 'Christian' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'COFE' },
    religion_description: { raw: 'Church of England (Anglican)' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '8' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'MOS' },
    religion_description: { raw: 'Muslim' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '4' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'NIL' },
    religion_description: { raw: 'No Religion' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '6' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: 'RC' },
    religion_description: { raw: 'Roman Catholic' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '7' },
  },
]

const mockEthnicTableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: 'A2' },
    ethnic_description: { raw: 'A2-Asian/Asian British: Pakistani' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '4' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: 'W2' },
    ethnic_description: { raw: 'W1-White: Eng./Welsh/Scot./N.Irish/British' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '24' },
  },
]

const mockCellTableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-001' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-002' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-005' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-006' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-007' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-008' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-009' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-010' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-015' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-016' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-017' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-1-018' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-001' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-002' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-003' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-004' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-005' },
    total_prisoners: { raw: '2' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-006' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: 'I-2-007' },
    total_prisoners: { raw: '1' },
  },
]

const mockNationalityTableData = [
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: 'BRIT' },
    nationality_description: { raw: 'British' },
    cell: { raw: '' },
    total_prisoners: { raw: '28' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    age_range_1: { raw: '' },
    age_range_2: { raw: '' },
    religion_code: { raw: '' },
    religion_description: { raw: '' },
    ethnic_code: { raw: 'W2' },
    ethnic_description: { raw: 'W1-White: Eng./Welsh/Scot./N.Irish/British' },
    nationality_code: { raw: '' },
    nationality_description: { raw: '' },
    cell: { raw: '' },
    total_prisoners: { raw: '24' },
  },
]

const mockDashboardListData = [
  [
    ...mockAgeRange1TableData,
    ...mockAgeRange2TableData,
    ...mockReligionTableData,
    ...mockEthnicTableData,
    ...mockTotalTablesData,
    ...mockCellTableData,
    ...mockNationalityTableData,
  ],
]

module.exports = {
  mockDashboardListData,
}
