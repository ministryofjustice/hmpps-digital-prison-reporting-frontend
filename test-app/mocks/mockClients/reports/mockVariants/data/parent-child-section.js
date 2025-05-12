const sectionOneOne = [
  {
    field1: 'Parent 1',
    section1: 'Section 1',
    section2: 'Section 1.1',
    childKey: 'one',
  },
  {
    field1: 'Parent 2',
    section1: 'Section 1',
    section2: 'Section 1.1',
    childKey: 'two',
  },
  {
    field1: 'Parent 3',
    section1: 'Section 1',
    section2: 'Section 1.1',
    childKey: 'three',
  },
]

const sectionOneTwo = [
  {
    field1: 'Parent 4',
    section1: 'Section 1',
    section2: 'Section 1.2',
    childKey: 'four',
  },
  {
    field1: 'Parent 5',
    section1: 'Section 1',
    section2: 'Section 1.2',
    childKey: 'five',
  },
  {
    field1: 'Parent 6',
    section1: 'Section 1',
    section2: 'Section 1.2',
    childKey: 'six',
  },
]

const parentData = () => {
  return [...sectionOneOne, ...sectionOneTwo]
}

const childData = () => {
  return [
    {
      field1: 'Child one - Parent 1',
      field2: 'Other value',
      childKey: 'one',
    },
    {
      field1: 'Child two - Parent 1',
      field2: 'Other value',
      childKey: 'one',
    },
    {
      field1: 'Child one - Parent 2',
      field2: 'Other value',
      childKey: 'two',
    },
    {
      field1: 'Child two - Parent 2',
      field2: 'Other value',
      childKey: 'two',
    },
    {
      field1: 'Child one - Parent 3',
      field2: 'Other value',
      childKey: 'three',
    },
    {
      field1: 'Child two - Parent 3',
      field2: 'Other value',
      childKey: 'three',
    },
    {
      field1: 'Child one - Parent 4',
      field2: 'Other value',
      childKey: 'four',
    },
    {
      field1: 'Child two - Parent 4',
      field2: 'Other value',
      childKey: 'four',
    },
    {
      field1: 'Child one - Parent 5',
      field2: 'Other value',
      childKey: 'five',
    },
    {
      field1: 'Child two - Parent 5',
      field2: 'Other value',
      childKey: 'five',
    },
    {
      field1: 'Child one - Parent 6',
      field2: 'Other value',
      childKey: 'six',
    },
    {
      field1: 'Child two - Parent 6',
      field2: 'Other value',
      childKey: 'six',
    },
  ]
}

module.exports = {
  parentData,
  childData,
}
