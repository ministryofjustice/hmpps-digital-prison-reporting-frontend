const variant1 = require('./mockVariants/variant1')
const variant2 = require('./mockVariants/variant2')
const variant3 = require('./mockVariants/variant3')
const variant4 = require('./mockVariants/variant4')
const variant5 = require('./mockVariants/variant5')
const variant6 = require('./mockVariants/variant6')
const variant7 = require('./mockVariants/variant7')
const variant8 = require('./mockVariants/variant8')
const variant9 = require('./mockVariants/variant9')
const variant10 = require('./mockVariants/variant10')
const variant11 = require('./mockVariants/variant11')
const variant12 = require('./mockVariants/variant12')
const variant13 = require('./mockVariants/variant13')
const variant14 = require('./mockVariants/variant14')
const variant15 = require('./mockVariants/variant15')
const variant16 = require('./mockVariants/variant16')
const variant17 = require('./mockVariants/variant17')
const variant18 = require('./mockVariants/variant18')

module.exports = {
  report: {
    id: 'test-report-1',
    name: 'Test Report',
    variants: [
      variant1,
      variant2,
      variant3,
      variant4,
      variant5,
      variant6,
      variant7,
      variant8,
      variant9,
      variant10,
      variant11,
      variant12,
      variant13,
      variant14,
      variant15,
      variant16,
      variant17,
      variant18
    ],
  },
  reports: [
    {
      id: 'test-report-1',
      name: 'C Test Report',
      variants: [variant1, variant2, variant3, variant4],
    },
    {
      id: 'test-report-1',
      name: 'D Test Report',
      variants: [variant5, variant6, variant7],
    },
    {
      id: 'test-report-2',
      name: 'B Test Report',
      variants: [variant8, variant9, variant10, variant11, variant17, variant18],
    },
    {
      id: 'test-report-2',
      name: 'A Test Report',
      variants: [variant12, variant13, variant14, variant15, variant16],
    },
  ],
}
