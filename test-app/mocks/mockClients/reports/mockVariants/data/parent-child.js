// @ts-nocheck
const parentData = () => {
  return [
    {
      field1: 'Parent row 1',
      section1: 'one',
    },
    {
      field1: 'Parent row 2',
      section1: 'two',
    },
    {
      field1: 'Parent row 3',
      section1: 'three',
    },
    {
      field1: 'Parent row 4',
      section1: 'four',
    },
  ]
}

const childData = () => {
  return [
    {
      field2: 'Child one - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child two - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child three - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child one - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child two - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child three - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child one - parent 3',
      field3: 'Other value',
      section1: 'four',
    },
    {
      field2: 'Child two - parent 3',
      field3: 'Other value',
      section1: 'four',
    },
    {
      field2: 'Child three - parent 3',
      field3: 'Other value',
      section1: 'four',
    },
  ]
}

const childData2 = () => {
  return [
    {
      field2: 'Child one - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child two - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child three - parent 1',
      field3: 'Other value',
      section1: 'one',
    },
    {
      field2: 'Child one - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child two - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child three - parent 2',
      field3: 'Other value',
      section1: 'two',
    },
    {
      field2: 'Child one - parent 3',
      field3: 'Other value',
      section1: 'three',
    },
    {
      field2: 'Child two - parent 3',
      field3: 'Other value',
      section1: 'three',
    },
    {
      field2: 'Child three - parent 3',
      field3: 'Other value',
      section1: 'three',
    },
  ]
}

module.exports = {
  parentData,
  childData,
  childData2,
}
