const parentData = () => {
  return [
    {
      field1: 'Value 1.1',
      field2: 'Value 1.2',
      joinField: 'joinFieldValue1',
    },
    {
      field1: 'Value 2.1',
      field2: 'Value 2.2',
      joinField: 'joinFieldValue2',
    },
  ]
}

const childData = () => {
  return [
    {
      childField1: 'Han Solo',
      childField2: 'Never tell me the odds.',
      joinField: 'joinFieldValue1',
    },
    {
      childField1: 'Master Yoda',
      childField2: 'Do or do not. There is no try',
      joinField: 'joinFieldValue1',
    },
    {
      childField1: 'Obi-wan Kenobi',
      childField2: 'Hello there',
      joinField: 'joinFieldValue2',
    },
    {
      childField1: 'Chewbacca',
      childField2: 'ROWWWWR',
      joinField: 'joinFieldValue2',
    },
  ]
}

const childData2 = () => {
  return [
    {
      childField1: 'Homer Simpson',
      childField2: 'Doh!',
      joinField: 'joinFieldValue1',
    },
    {
      childField1: 'Mr Burns',
      childField2: 'Excellent!',
      joinField: 'joinFieldValue1',
    },
    {
      childField1: 'Ned Flanders',
      childField2: 'Hi-diddly-ho, neighborino',
      joinField: 'joinFieldValue2',
    },
    {
      childField1: 'Marge Simpson',
      childField2: 'Hrmmm...',
      joinField: 'joinFieldValue2',
    },
  ]
}

module.exports = {
  parentData,
  childData,
  childData2,
}
