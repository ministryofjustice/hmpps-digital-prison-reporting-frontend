const boxBlotWide1 = {
  id: 'box-plot-wide-1',
  type: 'boxplot',
  display: 'Box plot example 1',
  description: 'Example of a box plot chart',
  options: {},
  columns: {
    keys: [],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
      {
        id: 'cat4',
        display: 'Category 4',
      },
    ],
  },
}

const boxBlotWide2 = {
  id: 'box-plot-wide-2',
  type: 'boxplot',
  display: 'Box plot example 2',
  description: 'Example of a box plot chart',
  options: {},
  columns: {
    keys: [],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
    ],
  },
}

const boxBlotGrouped1 = {
  id: 'box-plot-grouped-1',
  type: 'boxplot',
  display: 'Box plot grouped example 1',
  description: 'Example of a box plot chart using groups',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
    ],
  },
}

const boxBlotGrouped2 = {
  id: 'box-plot-grouped-2',
  type: 'boxplot',
  display: 'Box plot grouped example 2',
  description: 'Example of a box plot chart using groups - multiple categorys',
  options: {},
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
    ],
  },
}

const boxBlotGrouped3 = {
  id: 'box-plot-grouped-3',
  type: 'boxplot',
  display: 'Box plot grouped example 3',
  description: 'Example of a box plot chart using groups - multiple categorys - horizontal',
  options: {
    horizontal: true
  },
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
      {
        id: 'cat3',
        display: 'Category 3',
      },
      {
        id: 'cat4',
        display: 'Category 4',
      },
      {
        id: 'cat5',
        display: 'Category 5',
      },
      {
        id: 'cat6',
        display: 'Category 6',
      },
      {
        id: 'cat7',
        display: 'Category 7',
      },
      {
        id: 'cat8',
        display: 'Category 8',
      },
    ],
  },
}

const boxBlotGrouped4 = {
  id: 'box-plot-grouped-4',
  type: 'boxplot',
  display: 'Box plot grouped example 3',
  description: 'Example of a box plot chart using groups - multiple categorys, composite key',
  options: {

  },
  columns: {
    keys: [
      {
        id: 'date',
        display: 'Date',
      },
      {
        id: 'type',
        display: 'type',
      },
    ],
    measures: [
      {
        id: 'cat1',
        display: 'Category 1',
      },
      {
        id: 'cat2',
        display: 'Category 2',
      },
    ],
  },
}

module.exports = {
  boxBlotGrouped1,
  boxBlotGrouped2,
  boxBlotGrouped3,
  boxBlotGrouped4,
  boxBlotWide1,
  boxBlotWide2,
}
