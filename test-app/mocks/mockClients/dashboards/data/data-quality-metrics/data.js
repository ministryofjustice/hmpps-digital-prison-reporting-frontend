// @ts-nocheck
const mockTimeSeriesDataLastSixMonths = [
  [
    {
      ts: { raw: 'Aug 24' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 424,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 781,
        rag: 2,
      },
      has_metric_two: {
        raw: 459,
        rag: 0,
      },
      metric_two_is_missing: {
        raw: 528,
        rag: 1,
      },
      has_metric_three: {
        raw: 576,
        rag: 1,
      },
      metric_three_is_missing: {
        raw: 447,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Aug 24' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 761,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 610,
        rag: 2,
      },
      has_metric_two: {
        raw: 734,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 785,
        rag: 2,
      },
      has_metric_three: {
        raw: 758,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 694,
        rag: 2,
      },
    },
    {
      ts: { raw: 'Aug 24' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 401,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 499,
        rag: 0,
      },
      has_metric_two: {
        raw: 611,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 524,
        rag: 1,
      },
      has_metric_three: {
        raw: 734,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 404,
        rag: 0,
      },
    },
  ],
  [
    {
      ts: { raw: 'Sep 24' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 733,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 514,
        rag: 1,
      },
      has_metric_two: {
        raw: 573,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 554,
        rag: 1,
      },
      has_metric_three: {
        raw: 637,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 430,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Sep 24' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 559,
        rag: 1,
      },
      metric_one_is_missing: {
        raw: 518,
        rag: 1,
      },
      has_metric_two: {
        raw: 453,
        rag: 0,
      },
      metric_two_is_missing: {
        raw: 758,
        rag: 2,
      },
      has_metric_three: {
        raw: 562,
        rag: 1,
      },
      metric_three_is_missing: {
        raw: 430,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Sep 24' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 656,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 521,
        rag: 1,
      },
      has_metric_two: {
        raw: 659,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 531,
        rag: 1,
      },
      has_metric_three: {
        raw: 719,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 573,
        rag: 1,
      },
    },
  ],
  [
    {
      ts: { raw: 'Oct 24' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 738,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 598,
        rag: 1,
      },
      has_metric_two: {
        raw: 638,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 417,
        rag: 0,
      },
      has_metric_three: {
        raw: 428,
        rag: 0,
      },
      metric_three_is_missing: {
        raw: 767,
        rag: 2,
      },
    },
    {
      ts: { raw: 'Oct 24' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 692,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 676,
        rag: 2,
      },
      has_metric_two: {
        raw: 758,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 521,
        rag: 1,
      },
      has_metric_three: {
        raw: 430,
        rag: 0,
      },
      metric_three_is_missing: {
        raw: 726,
        rag: 2,
      },
    },
    {
      ts: { raw: 'Oct 24' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 665,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 687,
        rag: 2,
      },
      has_metric_two: {
        raw: 556,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 615,
        rag: 2,
      },
      has_metric_three: {
        raw: 460,
        rag: 0,
      },
      metric_three_is_missing: {
        raw: 467,
        rag: 0,
      },
    },
  ],
  [
    {
      ts: { raw: 'Nov 24' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 479,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 522,
        rag: 1,
      },
      has_metric_two: {
        raw: 471,
        rag: 0,
      },
      metric_two_is_missing: {
        raw: 546,
        rag: 1,
      },
      has_metric_three: {
        raw: 405,
        rag: 0,
      },
      metric_three_is_missing: {
        raw: 431,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Nov 24' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 635,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 790,
        rag: 2,
      },
      has_metric_two: {
        raw: 581,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 660,
        rag: 2,
      },
      has_metric_three: {
        raw: 780,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 434,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Nov 24' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 482,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 713,
        rag: 2,
      },
      has_metric_two: {
        raw: 707,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 751,
        rag: 2,
      },
      has_metric_three: {
        raw: 715,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 422,
        rag: 0,
      },
    },
  ],
  [
    {
      ts: { raw: 'Dec 24' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 467,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 431,
        rag: 0,
      },
      has_metric_two: {
        raw: 584,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 605,
        rag: 2,
      },
      has_metric_three: {
        raw: 746,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 423,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Dec 24' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 577,
        rag: 1,
      },
      metric_one_is_missing: {
        raw: 536,
        rag: 1,
      },
      has_metric_two: {
        raw: 524,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 664,
        rag: 2,
      },
      has_metric_three: {
        raw: 721,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 692,
        rag: 2,
      },
    },
    {
      ts: { raw: 'Dec 24' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 660,
        rag: 2,
      },
      metric_one_is_missing: {
        raw: 590,
        rag: 1,
      },
      has_metric_two: {
        raw: 529,
        rag: 1,
      },
      metric_two_is_missing: {
        raw: 708,
        rag: 2,
      },
      has_metric_three: {
        raw: 509,
        rag: 1,
      },
      metric_three_is_missing: {
        raw: 718,
        rag: 2,
      },
    },
  ],
  [
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 533,
        rag: 1,
      },
      metric_one_is_missing: {
        raw: 614,
        rag: 2,
      },
      has_metric_two: {
        raw: 684,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 665,
        rag: 2,
      },
      has_metric_three: {
        raw: 680,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 799,
        rag: 2,
      },
    },
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'GHI',
      },
      has_metric_one: {
        raw: 484,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 713,
        rag: 2,
      },
      has_metric_two: {
        raw: 700,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 506,
        rag: 1,
      },
      has_metric_three: {
        raw: 771,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 457,
        rag: 0,
      },
    },
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'DEF',
      },
      has_metric_one: {
        raw: 406,
        rag: 0,
      },
      metric_one_is_missing: {
        raw: 682,
        rag: 2,
      },
      has_metric_two: {
        raw: 703,
        rag: 2,
      },
      metric_two_is_missing: {
        raw: 409,
        rag: 0,
      },
      has_metric_three: {
        raw: 648,
        rag: 2,
      },
      metric_three_is_missing: {
        raw: 720,
        rag: 2,
      },
    },
  ],
]

module.exports = {
  mockTimeSeriesDataLastSixMonths,
}
