const parentData = () => {
  return [
    {
      field1: 'Value 1',
      field2: 'Value 2',
    },
  ]
}

const childData = () => {
  return [
    {
      childField1: 'Value 1.1',
      childField2: 'Value 1.2',
      joinField: 'joinField',
    },
    {
      childField1: 'Value 2.1',
      childField2: 'Value 2.2',
      joinField: 'joinField',
    },
    {
      childField1: 'Value 3.1',
      childField2: 'Value 3.2',
      joinField: 'joinField',
    },
  ]
}

module.exports = {
  parentData,
  childData,
}
