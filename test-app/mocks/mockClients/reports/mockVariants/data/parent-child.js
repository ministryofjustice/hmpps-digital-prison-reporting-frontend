// @ts-nocheck
const paddingData = {
  field2: 'Field 2 data',
  field3: 'Field 3 data',
  field4: 'Field 4 data',
  field5: 'Field 5 data',
  field6: 'Field 6 data',
  field7: 'Field 7 data',
  field8: 'Field 8 data',
}

const childPaddingData = {
  field4: 'Child Field 4 data',
  field5: 'Child Field 5 data',
  field6: 'Child Field 6 data',
  field7: 'Child Field 7 data',
  field8: 'Child Field 8 data',
}

const parentData = () => {
  return [
    {
      field1: 'Parent row 1',
      ...paddingData,
      section1: 'one',
    },
    {
      field1: 'Parent row 2',
      ...paddingData,
      section1: 'two',
    },
    {
      field1: 'Parent row 3',
      ...paddingData,
      section1: 'three',
    },
    {
      field1: 'Parent row 4',
      ...paddingData,
      section1: 'four',
    },
    {
      field1: 'Parent row 5',
      ...paddingData,
      section1: 'five',
    },
    {
      field1: 'Parent row 6',
      ...paddingData,
      section1: 'five',
    },
    {
      field1: 'Parent row 7',
      ...paddingData,
      section1: 'seven',
    },
  ]
}

const childData = () => {
  return [
    {
      field2: 'Child one - parent 1',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'one',
    },
    {
      field2: 'Child two - parent 1',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'one',
    },
    {
      field2: 'Child three - parent 1',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'one',
    },
    {
      field2: 'Child one - parent 2',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'two',
    },
    {
      field2: 'Child two - parent 2',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'two',
    },
    {
      field2: 'Child three - parent 2',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'two',
    },
    {
      field2: 'Child one - parent 4',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'four',
    },
    {
      field2: 'Child two - parent 4',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'four',
    },
    {
      field2: 'Child three - parent 4',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'four',
    },
    {
      field2: 'Child one - parent 7',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'seven',
    },
    {
      field2: 'Child two - parent 7',
      field3: 'Other value',
      ...childPaddingData,
      section1: 'seven',
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
